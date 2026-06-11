import { GalleryData } from '@/entities/youtube-video/types';
import youtubeMockData from '@/data/youtube_mock.json';

/**
 * Server-side function to fetch YouTube data at build time
 * This eliminates client-side fetch and reduces startup JS
 */
export async function getYouTubeData(): Promise<NonNullable<GalleryData['highlights']> | null> {
  const isDev = process.env.NODE_ENV === 'development';
  const skipMock = process.env.YOUTUBE_SKIP_MOCK === 'true';

  if (isDev && !skipMock) {
    console.log("YouTube API: Running in development mode, returning mock data to save quota.");
    return youtubeMockData.highlights || null;
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  const maxResults = 50;

  if (!apiKey || !channelId) {
    console.error("YouTube API: Missing environment variables");
    return null;
  }

  try {
    // 1. Obtener videos y estadísticas del canal en paralelo
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&type=video&maxResults=${maxResults}`;
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&id=${channelId}&part=statistics`;

    const [searchRes, channelRes] = await Promise.all([
      fetch(searchUrl, { next: { revalidate: 3600 } }),
      fetch(channelUrl, { next: { revalidate: 3600 } }),
    ]);

    if (!searchRes.ok) {
      const errorData = await searchRes.json();
      console.error("YouTube Search Error:", errorData);
      throw new Error("YouTube API Limit or Error");
    }

    const data = await searchRes.json();
    const videoItems = data.items || [];

    let subscriberCount = null;
    if (channelRes.ok) {
      const channelData = await channelRes.json();
      if (channelData?.items?.length > 0) {
        subscriberCount = channelData.items[0].statistics.subscriberCount;
      }
    }

    if (videoItems.length === 0) {
      return null;
    }

    // 2. Obtener los IDs y detalles
    const videoIds = videoItems.map((item: { id: { videoId?: string } }) => item.id.videoId).join(",");
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=contentDetails,statistics`;
    const detailsRes = await fetch(detailsUrl, { next: { revalidate: 3600 } });

    if (!detailsRes.ok) {
      console.error("YouTube Details Error:", await detailsRes.json());
      throw new Error("YouTube Details API Error");
    }

    const detailsData = await detailsRes.json();
    const detailsMap: Record<string, unknown> = {};
    (detailsData.items || []).forEach((item: { id: string; contentDetails: { duration: string }; statistics: Record<string, string> }) => {
      detailsMap[item.id] = {
        duration: item.contentDetails.duration,
        statistics: item.statistics
      };
    });

    // 5. Duración ISO 8601 a segundos mejorado
    function parseISODuration(duration: string): number {
      const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
      if (!match) return 0;
      const hours = parseInt(match[1] || "0");
      const minutes = parseInt(match[2] || "0");
      const seconds = parseInt(match[3] || "0");
      return hours * 3600 + minutes * 60 + seconds;
    }

    const shorts: any[] = [];
    const videos: any[] = [];

    videoItems.forEach((item: { id: { videoId?: string }; snippet: { title: string; thumbnails: { high: { url: string } } } }) => {
      const id = item.id.videoId!;
      const details = detailsMap[id] as { duration?: string; statistics?: Record<string, string> };
      const duration = details?.duration || "";
      const stats = details?.statistics || {};
      const totalSeconds = parseISODuration(duration);

      const videoObj = {
        id,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        viewCount: stats.viewCount || "0",
        likeCount: stats.likeCount || "0",
        commentCount: stats.commentCount || "0",
      };

      if (totalSeconds > 0 && totalSeconds <= 90) {
        shorts.push(videoObj);
      } else {
        videos.push(videoObj);
      }
    });

    const allVideos = [...videos, ...shorts];
    let viral: (typeof allVideos)[number] | null = null;
    let mostLiked: (typeof allVideos)[number] | null = null;
    let mostCommented: (typeof allVideos)[number] | null = null;
    let maxViews = -1, maxLikes = -1, maxComments = -1;

    for (const v of allVideos) {
      const views = parseInt(v.viewCount || "0");
      const likes = parseInt(v.likeCount || "0");
      const comments = parseInt(v.commentCount || "0");
      if (views > maxViews) { maxViews = views; viral = v; }
      if (likes > maxLikes) { maxLikes = likes; mostLiked = v; }
      if (comments > maxComments) { maxComments = comments; mostCommented = v; }
    }

    return { viral, mostLiked, mostCommented };

  } catch (error) {
    console.error("YouTube API Service Error:", error);
    // In production, return null so client handles offline state
    if (process.env.NODE_ENV === 'production') {
      return null;
    }
    // In development, return mock for UI testing
    return youtubeMockData.highlights || null;
  }
}