import { NextResponse } from 'next/server';
import { createClient } from '@/shared/api/supabaseServer';
import { Video, GalleryData } from '@/entities/youtube-video/types';
import youtubeMockData from '@/data/youtube_mock.json';

const CACHE_KEY = 'youtube_gallery';
const CACHE_TTL = 60 * 60 * 1000; // 1 hora

// Tipos para la respuesta de la API de YouTube
interface YoutubeApiSnippet {
  title: string;
  thumbnails: {
    high: { url: string };
  };
}

interface YoutubeApiItem {
  id: { kind: string; videoId?: string };
  snippet: YoutubeApiSnippet;
}

interface YoutubeApiResponse {
  items: YoutubeApiItem[];
}

interface CacheEntry {
  data: GalleryData;
  updated_at: string;
}

async function fetchYouTubeData(): Promise<GalleryData> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  const maxResults = 50;

  if (!apiKey || !channelId) {
    throw new Error("Missing environment variables");
  }

  const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&type=video&maxResults=${maxResults}`;
  const res = await fetch(searchUrl);

  if (!res.ok) {
    const errorData = await res.json();
    console.error("YouTube Search Error:", errorData);
    throw new Error("YouTube API Limit or Error");
  }

  const data: YoutubeApiResponse = await res.json();
  const videoItems = data.items || [];

  const channelUrl = `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&id=${channelId}&part=statistics`;
  const channelRes = await fetch(channelUrl);
  let subscriberCount = null;
  if (channelRes.ok) {
    const channelData = await channelRes.json();
    if (channelData?.items?.length > 0) {
      subscriberCount = channelData.items[0].statistics.subscriberCount;
    }
  }

  if (videoItems.length === 0) {
    return { shorts: [], videos: [], subscriberCount, highlights: null };
  }

  const videoIds = videoItems.map(item => item.id.videoId).join(",");
  const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=contentDetails,statistics`;
  const detailsRes = await fetch(detailsUrl);

  if (!detailsRes.ok) {
    console.error("YouTube Details Error:", await detailsRes.json());
    throw new Error("YouTube Details API Error");
  }

  const detailsData = await detailsRes.json();
  const detailsMap: Record<string, { duration?: string; statistics?: { viewCount?: string; likeCount?: string; commentCount?: string } }> = {};
  (detailsData.items || []).forEach((item: { id: string; contentDetails?: { duration?: string }; statistics?: { viewCount?: string; likeCount?: string; commentCount?: string } }) => {
    if (item.id) {
      detailsMap[item.id] = {
        duration: item.contentDetails?.duration,
        statistics: item.statistics
      };
    }
  });

  function parseISODuration(duration: string): number {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    return parseInt(match[1] || "0") * 3600 + parseInt(match[2] || "0") * 60 + parseInt(match[3] || "0");
  }

  const shorts: Video[] = [];
  const videos: Video[] = [];

  videoItems.forEach((item) => {
    const id = item.id.videoId!;
    const details = detailsMap[id];
    const totalSeconds = parseISODuration(details?.duration || "");

    const videoObj: Video = {
      id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      viewCount: details?.statistics?.viewCount || "0",
      likeCount: details?.statistics?.likeCount || "0",
      commentCount: details?.statistics?.commentCount || "0",
    };

    if (totalSeconds > 0 && totalSeconds <= 90) {
      shorts.push(videoObj);
    } else {
      videos.push(videoObj);
    }
  });

const allVideos = [...videos, ...shorts];
  
  const sortedByViews = allVideos.sort((a, b) => parseInt(b.viewCount || "0") - parseInt(a.viewCount || "0"));
  const sortedByLikes = allVideos.sort((a, b) => parseInt(b.likeCount || "0") - parseInt(a.likeCount || "0"));
  const sortedByComments = allVideos.sort((a, b) => parseInt(b.commentCount || "0") - parseInt(a.commentCount || "0"));
  
  const highlights = {
    viral: sortedByViews[0] || null,
    mostLiked: sortedByLikes[0] || null,
    mostCommented: sortedByComments[0] || null,
  };

  return { shorts, videos, subscriberCount, highlights };
}

export async function GET() {
  const useApi = process.env.YOUTUBE_USE_API === 'true';

  if (!useApi) {
    console.log("YouTube API: Using mock data.");
    return NextResponse.json(youtubeMockData);
  }

  try {
    // Try to get cached data from Supabase
    const supabase = await createClient();
    const { data: cacheData, error } = await supabase
      .from('youtube_cache')
      .select('data, updated_at')
      .eq('id', CACHE_KEY)
      .single();

    if (!error && cacheData) {
      const cacheEntry = cacheData as unknown as CacheEntry;
      const updatedAt = new Date(cacheEntry.updated_at).getTime();
      const now = Date.now();

      // Check if cache is still valid (less than 1 hour old)
      if ((now - updatedAt) < CACHE_TTL) {
        console.log("YouTube API: Returning Supabase cache");
        return NextResponse.json(cacheEntry.data);
      }
      console.log("YouTube API: Cache expired, fetching new data...");
    }

    // Fetch fresh data from YouTube
    const data = await fetchYouTubeData();

    // Save to Supabase cache (upsert)
    await supabase
      .from('youtube_cache')
      .upsert({
        id: CACHE_KEY,
        data: data,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

    console.log("YouTube API: Fetched and cached new data");
    return NextResponse.json(data);

  } catch (error) {
    console.error("YouTube API Route Error:", error);

    // Try to return cached data even if stale
    try {
      const supabase = await createClient();
      const { data: cacheData } = await supabase
        .from('youtube_cache')
        .select('data')
        .eq('id', CACHE_KEY)
        .single();

      if (cacheData) {
        console.log("YouTube API: Returning stale cache from Supabase");
        return NextResponse.json((cacheData as unknown as CacheEntry).data);
      }
    } catch {
      // Ignore cache fetch errors
    }

    // Fallback to mock data
    return NextResponse.json(youtubeMockData);
  }
}

