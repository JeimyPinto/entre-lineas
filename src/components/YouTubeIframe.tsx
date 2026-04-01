"use client";
import styles from "./YouTubeIframe.module.css";

interface YouTubeIframeProps {
  videoId: string;
}

export default function YouTubeIframe({ videoId }: YouTubeIframeProps) {
  return (
    <div className={styles.container}>
      <iframe
        className={styles.iframe}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
