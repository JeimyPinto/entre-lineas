import { NextResponse } from 'next/server';

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

// Tipo para el video simplificado
interface Video {
  id: string;
  title: string;
  thumbnail: string;
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
  const videoIds = videoItems.map((item) => item.id.videoId).join(",");

  // 4. Obtener detalles de duración de los videos
  const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=contentDetails`;
  const detailsRes = await fetch(detailsUrl);
  const detailsData = await detailsRes.json();
  interface YoutubeVideoDetailsItem {
    id: string;
    contentDetails: {
      duration: string;
    };
  }
  const durations: Record<string, string> = {};
  (detailsData.items as YoutubeVideoDetailsItem[] || []).forEach((item) => {
    durations[item.id] = item.contentDetails.duration;
  });

  // 5. Función para convertir ISO 8601 duration a segundos
  function parseISODuration(duration: string): number {
    // Ejemplo: PT1M30S, PT45S, PT2M
    const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    const minutes = match[1] ? parseInt(match[1]) : 0;
    const seconds = match[2] ? parseInt(match[2]) : 0;
    return minutes * 60 + seconds;
  }

  // 6. Separar shorts y videos normales
  const shorts: Video[] = [];
  const videos: Video[] = [];
  videoItems.forEach((item) => {
    const id = item.id.videoId!;
    const duration = durations[id] || "";
    const seconds = parseISODuration(duration);
    const videoObj = {
      id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
    };
    if (seconds > 0 && seconds < 120) {
      shorts.push(videoObj);
    } else {
      videos.push(videoObj);
    }
  });

  return NextResponse.json({ shorts, videos, subscriberCount });
}
