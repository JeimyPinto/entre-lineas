"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./InstagramCard.module.css";
import { FaInstagram, FaYoutube, FaLocationDot, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { use } from "react";

export interface Judge {
  name: string;
  image?: string; // path to photo in /public/artists/
  artistId?: string; // anchor id to link to artist section
}

export interface InstagramCardProps {
  /** URL of the Instagram post */
  postUrl: string;
  /** URL of the YouTube video */
  youtubeLink?: string;
  /** Thumbnail image (local path in /public) */
  thumbnail?: string;
  /** Title / name of the event */
  title: string;
  /** Display date string */
  date: string;
  /** City / location */
  location: string;
  /** List of judges */
  judges?: Judge[];
  /** List of hosts */
  hosts?: Judge[];
  /** Artists data for lookups - passed from server */
  artists?: { id: string; name: string; image?: string }[];
  /** Extra CSS class */
  className?: string;
}

const DEFAULT_THUMBNAIL = "/Entre-lineas-logo.png";

export default function InstagramCard({
  postUrl,
  youtubeLink,
  thumbnail,
  title,
  date,
  location,
  judges = [],
  hosts = [],
  artists = [],
  className = "",
}: InstagramCardProps) {
  const displayThumbnail = thumbnail || DEFAULT_THUMBNAIL;

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
          src={displayThumbnail}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.thumbnail}
          style={{ objectFit: thumbnail ? "cover" : "contain", padding: thumbnail ? 0 : "2rem" }}
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
              const artistInfo = judge.artistId 
                ? artists.find(a => a.id === judge.artistId) || null 
                : null;
              const displayName = artistInfo 
                ? artistInfo.name.toUpperCase() 
                : judge.name.toUpperCase();
              const displayImage = artistInfo 
                ? artistInfo.image 
                : judge.image;

              const content = (
                <>
                  {displayImage ? (
                    <Image
                      src={displayImage}
                      alt={displayName}
                      width={28}
                      height={28}
                      className={styles.judgeAvatar}
                      style={{ width: "28px", height: "auto" }}
                    />
                  ) : (
                    <span className={styles.judgePlaceholder}>
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className={styles.judgeName}>{displayName}</span>
                </>
              );

              return judge.artistId ? (
                <Link key={judge.artistId} href={`#artista-${judge.artistId}`} className={styles.judgeChip}>
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

      {/* Hosts strip */}
      {hosts.length > 0 && (
        <div className={styles.judgesRow} style={{ paddingTop: 0 }}>
          <span className={styles.judgesLabel}>Host</span>
          <div className={styles.judgesAvatars}>
            {hosts.map((host) => {
              const artistInfo = host.artistId 
                ? artists.find(a => a.id === host.artistId) || null 
                : null;
              const displayName = artistInfo 
                ? artistInfo.name.toUpperCase() 
                : host.name.toUpperCase();
              const displayImage = artistInfo 
                ? artistInfo.image 
                : host.image;

              const content = (
                <>
                  {displayImage ? (
                    <Image
                      src={displayImage}
                      alt={displayName}
                      width={28}
                      height={28}
                      className={styles.judgeAvatar}
                      style={{ width: "28px", height: "auto" }}
                    />
                  ) : (
                    <span className={styles.judgePlaceholder}>
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className={styles.judgeName}>{displayName}</span>
                </>
              );

              return host.artistId ? (
                <Link key={host.artistId} href={`#artista-${host.artistId}`} className={styles.judgeChip}>
                  {content}
                </Link>
              ) : (
                <div key={host.name} className={styles.judgeChip}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CTAs */}
      <div className={styles.actions}>
        <a
          href={postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaLink}
        >
          <FaInstagram size={16} />
          Instagram
          <FaArrowUpRightFromSquare size={10} className={styles.ctaIcon} />
        </a>
        
        {youtubeLink && (
          <a
            href={youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.ctaLink} ${styles.youtubeLink}`}
          >
            <FaYoutube size={16} />
            YouTube
            <FaArrowUpRightFromSquare size={10} className={styles.ctaIcon} />
          </a>
        )}
      </div>
    </div>
  );
}
