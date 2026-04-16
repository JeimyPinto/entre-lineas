"use client";
import Card from "./ui/Card";

interface GalleryItemProps {
  id: string;
  title: string;
  thumbnail: string;
  onClick: (id: string) => void;
}

export default function GalleryItem({ id, title, thumbnail, onClick }: GalleryItemProps) {
  return (
    <div onClick={() => onClick(id)} style={{ cursor: 'pointer', aspectRatio: '16/9', overflow: 'hidden' }}>
      <Card title={title}>
        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
          <img 
            src={thumbnail} 
            alt={title} 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      </Card>
    </div>
  );
}
