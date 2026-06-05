"use client";
import { useState } from "react";
import styles from "./YouTubeIframe.module.css";

interface YouTubeIframeProps {
  videoId: string;
}

export default function YouTubeIframe({ videoId }: YouTubeIframeProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>El video no está disponible.</p>
          <p>Puede que el video haya sido eliminado o marcado como privado.</p>
          <a 
            href={`https://www.youtube.com/watch?v=${videoId}`} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'var(--color-accent)', marginTop: '1rem' }}
          >
            Ver en YouTube →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <iframe
        className={styles.iframe}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onError={() => setHasError(true)}
      ></iframe>
    </div>
  );
}
