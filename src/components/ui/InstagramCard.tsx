"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./InstagramCard.module.css";
import { FaInstagram, FaLocationDot, FaArrowUpRightFromSquare } from "react-icons/fa6";

export interface Judge {
  name: string;
  image?: string; // path to photo in /public/artists/
  artistId?: string; // anchor id to link to artist section
}

export interface InstagramCardProps {
  /** URL of the Instagram post */
  postUrl: string;
  /** Thumbnail image (local path in /public) */
  thumbnail: string;
  /** Title / name of the event */
  title: string;
  /** Display date string */
  date: string;
  /** City / location */
  location: string;
  /** List of judges / artists */
  judges?: Judge[];
  /** Extra CSS class */
  className?: string;
}

export default function InstagramCard({
  postUrl,
  thumbnail,
  title,
  date,
  location,
  judges = [],
  className = "",
}: InstagramCardProps) {
  return (
    <div className={`${styles.card} ${className}`}>
      {/* Thumbnail */}
      <a
        href={postUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.thumbnailWrapper}
      >
        <Image
          src={thumbnail}
          alt={title}
          fill
          className={styles.thumbnail}
        />
        <div className={styles.thumbnailOverlay} />
        <span className={styles.instaBadge}>
          <FaInstagram size={20} />
        </span>
      </a>

      {/* Event info */}
      <div className={styles.content}>
        <span className={styles.eventDate}>{date}</span>
        <h3 className={styles.eventTitle}>{title}</h3>
        <span className={styles.eventLocation}>
          <FaLocationDot size={14} />
          {location}
        </span>
      </div>

      {/* Judges strip */}
      {judges.length > 0 && (
        <div className={styles.judgesRow}>
          <span className={styles.judgesLabel}>Jueces</span>
          <div className={styles.judgesAvatars}>
            {judges.map((judge) => {
              const content = (
                <>
                  {judge.image ? (
                    <Image
                      src={judge.image}
                      alt={judge.name}
                      width={28}
                      height={28}
                      className={styles.judgeAvatar}
                    />
                  ) : (
                    <span className={styles.judgePlaceholder}>
                      {judge.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className={styles.judgeName}>{judge.name}</span>
                </>
              );

              return judge.artistId ? (
                <Link key={judge.name} href={`#artista-${judge.artistId}`} className={styles.judgeChip}>
                  {content}
                </Link>
              ) : (
                <div key={judge.name} className={styles.judgeChip}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CTA */}
      <a
        href={postUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.ctaLink}
      >
        Ver en Instagram
        <FaArrowUpRightFromSquare size={13} className={styles.ctaIcon} />
      </a>
    </div>
  );
}
