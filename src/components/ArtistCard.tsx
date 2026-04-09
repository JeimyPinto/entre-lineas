"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./ArtistCard.module.css";
import Button from "./ui/Button";
import { FaInstagram, FaYoutube, FaFacebook, FaGlobe, FaChevronDown } from "react-icons/fa6";
import { Artist } from "../data/artists";

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
      default: return <FaGlobe size={18} />;
    }
  };

  const hasContent = artist.bio[0] !== "" || artist.socials.some(s => s.url !== "https://www.instagram.com/");

  return (
    <div className={`${styles.card} ${isExpanded ? styles.expanded : ""}`}>
      {/* Desktop Version */}
      <div className={styles.desktopView} onClick={() => hasContent && onOpenModal(artist)}>
        <div className={styles.imageWrapper}>
          <Image
            src={artist.image || "/1-01.png"}
            alt={artist.name}
            fill
            sizes="(min-width: 900px) 25vw, 100vw"
            className={styles.image}
            style={{ objectFit: 'cover' }}
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
        </div>
      </div>

      {/* Mobile Version (Accordion style) */}
      <div className={styles.mobileView}>
        <div className={styles.accordionHeader} onClick={() => hasContent && setIsExpanded(!isExpanded)}>
          <div className={styles.thumbWrapper}>
            <Image
              src={artist.image || "/1-01.png"}
              alt={artist.name}
              width={60}
              height={60}
              className={styles.thumb}
              style={{ width: "60px", height: "auto" }}
            />
          </div>
          <div className={styles.mobileMainInfo}>
            <h3 className={styles.mobileName}>{artist.name}</h3>
            <span className={styles.mobileRoles}>{artist.orgRole.join(" • ")}</span>
          </div>
          {hasContent && (
            <FaChevronDown className={`${styles.chevron} ${isExpanded ? styles.chevronUp : ""}`} />
          )}
        </div>

        {isExpanded && (
          <div className={styles.accordionContent}>
            <div className={styles.mobileMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Profesión</span>
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
                    className={styles.mobileSocialBtn}
                    fullWidth
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
