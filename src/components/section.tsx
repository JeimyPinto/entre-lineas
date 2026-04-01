"use client";

import Image from "next/image";
import styles from "./section.module.css";
import { useYouTubeData } from "@/hooks/useYouTubeData";
import Card from "./ui/Card";

export default function MainSection() {
  const { highlights } = useYouTubeData();

  return (
    <section className={styles.homeSection}>
      <div className={styles.homeAbout}>
        <Image src="/1-01.png"
          alt="Logo Entre Líneas"
          className={styles.homeLogo}
          width={140}
          height={198}
          priority />
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
                <span className={styles.highlightLabel}>🚀 Más Viral</span>
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
                <span className={styles.highlightLabel}>❤️ Más Gustado</span>
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
                <span className={styles.highlightLabel}>💬 Más Comentado</span>
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
        <span className={styles.homeSocialLabel}>Síguenos:</span>
        <a className={styles.homeSocialLink}
          href="https://instagram.com/entr3_line4s"
          target="_blank"
          rel="noopener noreferrer">
          <Image src="/skill-icons_instagram.svg"
            alt="Instagram"
            className={styles.homeSocialIcon}
            width={32}
            height={32} />
          Instagram
        </a>
        <a className={styles.homeSocialLink}
          href="https://www.youtube.com/@Entr3_Line4s"
          target="_blank"
          rel="noopener noreferrer">
          <Image src="/logos_youtube-icon.svg"
            alt="YouTube"
            className={styles.homeSocialIcon}
            width={32}
            height={32} />
          YouTube
        </a>
      </div>
    </section>
  )
}