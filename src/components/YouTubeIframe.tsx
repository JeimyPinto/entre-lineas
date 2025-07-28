
"use client";
import '@/styles/youTubeIframe.css';

interface YouTubeIframeProps {
  videoId: string;
}

export default function YouTubeIframe({ videoId }: YouTubeIframeProps) {
  return (
    <iframe
      className="youtube-iframe"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}
