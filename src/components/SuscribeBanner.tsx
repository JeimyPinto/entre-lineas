"use client";
import '@/styles/suscribeBanner.css';
const CHANNEL_ID = "UColw-XWA4S-yN9SLKnL31xQ";


export default function SuscribeBanner() {
  return (
    <div className="suscribe-banner">
      <p>
        ¡Suscríbete a nuestro canal de YouTube!<br />
        <span>
          Es gratis y nos apoyas muchísimo 🙌
        </span>
      </p>
      <a
        href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn--subscribe"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="1.5em"
          height="1.5em"
        >
          <rect width="24" height="24" rx="6" fill="#000"/>
          <path d="M21.8 8.001a2.75 2.75 0 0 0-1.93-1.94C18.1 6 12 6 12 6s-6.1 0-7.87.06A2.75 2.75 0 0 0 2.2 8.001 28.6 28.6 0 0 0 2 12a28.6 28.6 0 0 0 .2 3.999 2.75 2.75 0 0 0 1.93 1.94C5.9 18 12 18 12 18s6.1 0 7.87-.06a2.75 2.75 0 0 0 1.93-1.94A28.6 28.6 0 0 0 22 12a28.6 28.6 0 0 0-.2-3.999z" fill="#FF0000"/>
          <polygon points="10,15 16,12 10,9" fill="#fff"/>
        </svg>
        Suscribirse
      </a>
    </div>
  );
}
