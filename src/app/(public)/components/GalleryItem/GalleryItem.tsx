"use client";
import Card from "@/shared/ui/Card/Card";
import { FaPlay } from "react-icons/fa6";
import styles from "./GalleryItem.module.css";

interface GalleryItemProps {
  id: string | number;
  title: string;
  thumbnail: string;
  onClick: (id: string) => void;
}

export default function GalleryItem({ id, title, thumbnail, onClick }: GalleryItemProps) {
  return (
    <article className={styles.galleryItem}>
      <button
        className={styles.galleryItemButton}
        onClick={() => onClick(String(id))}
        aria-label={`Ver video: ${title}`}
      >
        <Card minimal title={title} className={styles.card}>
          <div className={styles.thumbnailWrapper}>
            <img
              src={thumbnail}
              alt={title}
              className={styles.thumbnail}
              loading="lazy"
            />
            {/* Play overlay on hover/focus */}
            <div className={styles.playOverlay} aria-hidden="true">
              <FaPlay
                size={32}
                color="#fff"
                className={styles.playButton}
                aria-hidden="true"
              />
            </div>
          </div>
        </Card>
      </button>
    </article>
  );
}