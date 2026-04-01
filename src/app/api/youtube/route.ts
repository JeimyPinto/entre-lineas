import { NextResponse } from 'next/server';

import { Video } from '@/types/youtube';

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

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  const maxResults = 100;

  // 1. Obtener los videos recientes del canal
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`;
  const res = await fetch(searchUrl);
  const data: YoutubeApiResponse = await res.json();

  // 1b. Obtener estadísticas del canal (suscriptores)
  const channelUrl = `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&id=${channelId}&part=statistics`;
  const channelRes = await fetch(channelUrl);
  const channelData = await channelRes.json();
  let subscriberCount = null;
  if (channelData.items && channelData.items.length > 0) {
    subscriberCount = channelData.items[0].statistics.subscriberCount;
  }

  // 2. Filtrar solo videos (no playlists)
  const videoItems = (data.items || [])
    .filter((item) => item.id.kind === 'youtube#video' && item.id.videoId);

  // 3. Obtener los IDs de los videos
  const videoIdsArray = videoItems.map((item) => item.id.videoId);
  const videoIds = videoIdsArray.join(",");

  // 4. Obtener detalles de duración y estadisticas de los videos
  const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=contentDetails,statistics`;
  const detailsRes = await fetch(detailsUrl);
  const detailsData = await detailsRes.json();
  
  interface YoutubeVideoDetailsItem {
    id: string;
    contentDetails: {
      duration: string;
    };
    statistics: {
      viewCount: string;
      likeCount?: string;
      commentCount?: string;
    }
  }

  const detailsMap: Record<string, { duration: string, statistics: any }> = {};
  (detailsData.items as YoutubeVideoDetailsItem[] || []).forEach((item) => {
    detailsMap[item.id] = { 
      duration: item.contentDetails.duration,
      statistics: item.statistics
    };
  });

  // 5. Función para convertir ISO 8601 duration a segundos
  function parseISODuration(duration: string): number {
    const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    const minutes = match[1] ? parseInt(match[1]) : 0;
    const seconds = match[2] ? parseInt(match[2]) : 0;
    return minutes * 60 + seconds;
  }

  // 6. Separar shorts y videos normales y recolectar para highlights
  const shorts: Video[] = [];
  const videos: Video[] = [];
  const allParsedVideos: Video[] = [];

  videoItems.forEach((item) => {
    const id = item.id.videoId!;
    const details = detailsMap[id];
    const duration = details?.duration || "";
    const statistics = details?.statistics || {};
    const seconds = parseISODuration(duration);
    
    const videoObj: Video = {
      id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      viewCount: statistics.viewCount || "0",
      likeCount: statistics.likeCount || "0",
      commentCount: statistics.commentCount || "0",
    };

    allParsedVideos.push(videoObj);

    if (seconds > 0 && seconds < 120) {
      shorts.push(videoObj);
    } else {
      videos.push(videoObj);
    }
  });

  // Encontrar highlights (solo de los videos normales para mejores resultados visuales, o de todos)
  const highlights = {
    viral: allParsedVideos.length > 0 ? [...allParsedVideos].sort((a, b) => parseInt(b.viewCount || "0") - parseInt(a.viewCount || "0"))[0] : null,
    mostLiked: allParsedVideos.length > 0 ? [...allParsedVideos].sort((a, b) => parseInt(b.likeCount || "0") - parseInt(a.likeCount || "0"))[0] : null,
    mostCommented: allParsedVideos.length > 0 ? [...allParsedVideos].sort((a, b) => parseInt(b.commentCount || "0") - parseInt(a.commentCount || "0"))[0] : null,
  };

  return NextResponse.json({ shorts, videos, subscriberCount, highlights });
}
