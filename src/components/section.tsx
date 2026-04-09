"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./section.module.css";
import { useYouTubeData } from "@/hooks/useYouTubeData";
import Card from "./ui/Card";
import { FaInstagram, FaYoutube, FaHeart, FaComment, FaFire } from "react-icons/fa6";

import { useInterval } from "@/hooks/useInterval";

export default function MainSection() {
  const { highlights } = useYouTubeData();
  const [logoIndex, setLogoIndex] = useState(0);
  const logos = ["/1-01.png", "/1-02.png", "/1-03.png", "/1-04.png"];

  useInterval(() => {
    setLogoIndex((prev) => (prev + 1) % logos.length);
  }, 400);

  return (
    <section className={styles.homeSection}>
      <div className={styles.homeAbout}>
        <div className={styles.logoContainer}>
          <Image 
            src={logos[logoIndex]}
            alt="Logo Animado Entre Líneas"
            fill
            className={styles.homeLogo}
            style={{ objectFit: "contain" }}
            priority 
          />
        </div>
        <h2 className={styles.homeTitle}>¿Quiénes somos?</h2>
        <p className={styles.homeDescription}>
          Entre Líneas es un proyecto audiovisual y artístico dedicado a promover y difundir la cultura, así como el talento de artistas, freestylers y músicos colombianos.
        </p>
      </div>

      {highlights && (
        <div className={styles.homeHighlights}>
          <h3 className={styles.highlightsTitle}>Hitos del Canal</h3>
          <div className={styles.highlightsGrid}>
            {highlights.viral && (
              <div className={styles.highlightItem}>
                <span className={styles.highlightLabel}><FaFire size={18} /> Más Viral</span>
                <Card 
                  image={highlights.viral.thumbnail} 
                  title={highlights.viral.title} 
                  subtitle={`${Number(highlights.viral.viewCount).toLocaleString()} Visualizaciones`}
                  href={`https://youtube.com/watch?v=${highlights.viral.id}`}
                  isExternal
                />
              </div>
            )}
            {highlights.mostLiked && (
              <div className={styles.highlightItem}>
                <span className={styles.highlightLabel}><FaHeart size={16} /> Más Gustado</span>
                <Card 
                  image={highlights.mostLiked.thumbnail} 
                  title={highlights.mostLiked.title} 
                  subtitle={`${Number(highlights.mostLiked.likeCount).toLocaleString()} Likes`}
                  href={`https://youtube.com/watch?v=${highlights.mostLiked.id}`}
                  isExternal
                />
              </div>
            )}
            {highlights.mostCommented && (
              <div className={styles.highlightItem}>
                <span className={styles.highlightLabel}><FaComment size={16} /> Más Comentado</span>
                <Card 
                  image={highlights.mostCommented.thumbnail} 
                  title={highlights.mostCommented.title} 
                  subtitle={`${Number(highlights.mostCommented.commentCount).toLocaleString()} Comentarios`}
                  href={`https://youtube.com/watch?v=${highlights.mostCommented.id}`}
                  isExternal
                />
              </div>
            )}
          </div>
        </div>
      )}

      <div className={styles.homeSocial}>
        <span className={styles.homeSocialLabel}>Tu apoyo hace crecer la escena. ¡Síguenos!:</span>
        <a className={styles.homeSocialLink}
          href="https://instagram.com/entr3_line4s"
          target="_blank"
          rel="noopener noreferrer">
          <FaInstagram className={styles.homeSocialIcon} size={24} />
          Instagram
        </a>
        <a className={styles.homeSocialLink}
          href="https://www.youtube.com/@Entr3_Line4s"
          target="_blank"
          rel="noopener noreferrer">
          <FaYoutube className={styles.homeSocialIcon} size={24} />
          YouTube
        </a>
      </div>
    </section>
  )
}