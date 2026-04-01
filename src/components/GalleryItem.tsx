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
    <Card 
      image={thumbnail} 
      title={title} 
      aspectRatio="video" 
      onClick={() => onClick(id)} 
    />
  );
}
