"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import styles from "./ArtistCard.module.css";
import Button from "@/shared/ui/Button/Button";
import { FaInstagram, FaYoutube, FaFacebook, FaGlobe, FaChevronDown, FaTiktok } from "react-icons/fa6";
import { Artist } from "@/entities";

interface ArtistCardProps {
  artist: Artist;
  onOpenModal: (artist: Artist) => void;
}

export default function ArtistCard({ artist, onOpenModal }: ArtistCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <FaInstagram size={18} />;
      case 'youtube': return <FaYoutube size={18} />;
      case 'facebook': return <FaFacebook size={18} />;
      case 'tiktok': return <FaTiktok size={18} />;
      default: return <FaGlobe size={18} />;
    }
  };

  const socialLinks = artist.socials.filter(s => s.url !== "https://www.instagram.com/");
  const hasContent = artist.bio[0] !== "" || socialLinks.length > 0;
  const imageSrc = artist.image || "/1-01.png";

  const handleDesktopClick = () => {
    if (hasContent) onOpenModal(artist);
  };

  const handleMobileToggle = () => {
    if (hasContent) setIsExpanded(prev => !prev);
  };

  return (
    <div className={`${styles.card} ${isExpanded ? styles.expanded : ""}`}>
      {/* Desktop Version */}
      <button
        className={styles.desktopButton}
        onClick={handleDesktopClick}
        aria-label={hasContent ? `Ver biografía de ${artist.name}` : undefined}
        disabled={!hasContent}
        aria-disabled={!hasContent}
      >
        <div className={styles.imageWrapper}>
          <Image
            src={imageSrc}
            alt={artist.name}
            fill
            className={styles.image}
            sizes="(max-width: 900px) 60px, (max-width: 1200px) 280px, 320px"
            style={{ '--image-position': artist.imagePosition || '50%' } as React.CSSProperties}
          />
          {hasContent && (
            <div className={styles.overlay}>
              <span className={styles.overlayText}>Ver biografía</span>
            </div>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.roleTags}>
            {artist.orgRole.map((role, i) => (
              <span key={i} className={styles.roleTag}>{role}</span>
            ))}
          </div>
          <h3 className={styles.name}>{artist.name}</h3>
          {socialLinks.length > 0 && (
            <div className={styles.cardSocials}>
              <Button
                href={socialLinks[0].url}
                variant="social"
                onClick={(event: MouseEvent<HTMLAnchorElement>) => event.stopPropagation()}
              >
                {getSocialIcon(socialLinks[0].platform)}
                {socialLinks[0].label}
              </Button>
            </div>
          )}
        </div>
      </button>

      {/* Mobile Version (Accordion style) */}
      <div className={styles.mobileView}>
        <button
          className={styles.accordionHeader}
          onClick={handleMobileToggle}
          disabled={!hasContent}
          aria-disabled={!hasContent}
          aria-expanded={isExpanded}
          aria-controls={`artist-content-${artist.id}`}
        >
          <div className={styles.thumbWrapper}>
            <Image
              src={imageSrc}
              alt={artist.name}
              fill
              className={styles.thumb}
              sizes="60px"
              style={{ '--image-position': artist.imagePosition || '50%' } as React.CSSProperties}
            />
          </div>
          <div className={styles.mobileMainInfo}>
            <h3 className={styles.mobileName}>{artist.name}</h3>
            <span className={styles.mobileRoles}>{artist.orgRole.join(" • ")}</span>
          </div>
          {hasContent && (
            <FaChevronDown className={`${styles.chevron} ${isExpanded ? styles.chevronUp : ""}`} aria-hidden="true" />
          )}
        </button>

        {isExpanded && (
          <div id={`artist-content-${artist.id}`} className={styles.accordionContent}>
            <div className={styles.mobileMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Profesión u Ocupación</span>
                <span className={styles.metaValue}>{artist.profession}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Origen</span>
                <span className={styles.metaValue}>{artist.origin}</span>
              </div>
            </div>

            <div className={styles.mobileBio}>
              {artist.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className={styles.mobileSocials}>
              {artist.socials.map((social, i) => (
                social.url !== "https://www.instagram.com/" && (
                  <Button
                    key={i}
                    href={social.url}
                    variant="social"
                  >
                    {getSocialIcon(social.platform)}
                    {social.label}
                  </Button>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}