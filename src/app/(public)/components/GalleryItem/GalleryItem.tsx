"use client";
import Card from "@/shared/ui/Card/Card";
import { FaPlay } from "react-icons/fa6";

interface GalleryItemProps {
  id: string;
  title: string;
  thumbnail: string;
  onClick: (id: string) => void;
}

export default function GalleryItem({ id, title, thumbnail, onClick }: GalleryItemProps) {
  return (
    <div 
      onClick={() => onClick(id)} 
      style={{ cursor: 'pointer', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '12px' }}
    >
      <Card minimal title={title}>
        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
          <img 
            src={thumbnail} 
            alt={title} 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          {/* Play overlay on hover */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.3)',
            opacity: 0,
            transition: 'opacity 0.2s',
          }} className="play-overlay">
            <FaPlay size={32} color="#fff" style={{ 
              background: 'rgba(239,68,68,0.9)', 
              padding: '12px', 
              borderRadius: '50%',
              marginLeft: '4px'
            }} />
          </div>
        </div>
      </Card>
      <style>{`
        div:hover .play-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
