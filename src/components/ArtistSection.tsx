"use client";
import Image from "next/image";
import styles from "./ArtistSection.module.css";
import Button from "./ui/Button";
import { FaInstagram } from "react-icons/fa6";

import { artistsData } from "../data/artists";

export default function ArtistSection() {
  return (
    <div className={styles.artistsWrapper}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>Nuestros Artistas</h2>
        <p className={styles.subtitle}>Conoce más sobre los talentos que forman parte de Entre Líneas.</p>
      </div>

      {artistsData.map((artist) => (
        <section key={artist.id} id={`artista-${artist.id}`} className={styles.artistSection}>
          <div className={styles.imageContainer}>
            <Image
              src={artist.image || "/artists/placeholder.jpg"}
              alt={`${artist.name} - ${Array.isArray(artist.tag) ? artist.tag.join(" - ") : artist.tag}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.artistImage}
              priority
            />
          </div>

          <div className={styles.contentContainer}>
            <div className={styles.tagContainer}>
              {Array.isArray(artist.tag) ? (
                artist.tag.map((t, index) => (
                  <span key={index} className={styles.artistTag}>{t}</span>
                ))
              ) : (
                <span className={styles.artistTag}>{artist.tag}</span>
              )}
            </div>
            <h2 className={styles.artistName}>{artist.name}</h2>
            
            {artist.details && artist.details.length > 0 && (
              <div className={styles.artistDetails}>
                {artist.details.map((detail, index) => (
                  <div key={index} className={styles.detailItem}>
                    <span className={styles.detailLabel}>{detail.label}</span>
                    <span className={styles.detailValue}>{detail.value}</span>
                  </div>
                ))}
              </div>
            )}

            {artist.bio && artist.bio.length > 0 && (
              <div className={styles.artistBio}>
                {artist.bio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}

            {artist.instagram && (
              <div className={styles.socialContainer}>
                <Button 
                  href={artist.instagram} 
                  variant="outline"
                >
                  <FaInstagram size={22} />
                  Seguir en Instagram
                </Button>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
