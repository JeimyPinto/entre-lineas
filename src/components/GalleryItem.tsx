
"use client";
import Image from "next/image";
import '@/styles/galleryItem.css';

interface GalleryItemProps {
  id: string;
  title: string;
  thumbnail: string;
  onClick: (id: string) => void;
}

export default function GalleryItem({ id, title, thumbnail, onClick }: GalleryItemProps) {
  return (
    <div
      className="gallery-item"
      onClick={() => onClick(id)}
    >
      <div style={{ position: 'relative', width: '100%' }}>
        <Image
          src={thumbnail}
          alt={title}
          width={320}
          height={180}
          className="gallery-thumb"
        />
        <div className="gallery-thumb-overlay" />
      </div>
      <span className="gallery-caption">{title}</span>
    </div>
  );
}
