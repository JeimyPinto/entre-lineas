"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/shared/ui/Button/Button";
import styles from "./section.module.css";
import { useYouTubeData } from "@/features/youtube/hooks/useYouTubeData";
import Card from "@/shared/ui/Card/Card";
import { FaInstagram, FaYoutube, FaHeart, FaComment, FaFire } from "react-icons/fa6";

import { useInterval } from "@/hooks/useInterval";

export default function MainSection() {
  const { highlights } = useYouTubeData();
  
  const formatStat = (value: any) => {
    const num = Number(value);
    return isNaN(num) ? "0" : num.toLocaleString();
  };
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
            sizes="(max-width: 768px) 100vw, 400px"
            loading="eager"
            priority 
            style={{ objectFit: "contain" }}
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
                <a href={`https://youtube.com/watch?v=${highlights.viral.id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <Card 
                    title={highlights.viral.title} 
                    subtitle={`${formatStat(highlights.viral.viewCount)} Visualizaciones`}
                  >
                    <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                      <img 
                        src={highlights.viral.thumbnail} 
                        alt={highlights.viral.title} 
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>
                  </Card>
                </a>
              </div>
            )}
            {highlights.mostLiked && (
              <div className={styles.highlightItem}>
                <span className={styles.highlightLabel}><FaHeart size={16} /> Más Gustado</span>
                <a href={`https://youtube.com/watch?v=${highlights.mostLiked.id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <Card 
                    title={highlights.mostLiked.title} 
                    subtitle={`${formatStat(highlights.mostLiked.likeCount)} Likes`}
                  >
                    <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                      <img 
                        src={highlights.mostLiked.thumbnail} 
                        alt={highlights.mostLiked.title} 
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>
                  </Card>
                </a>
              </div>
            )}
            {highlights.mostCommented && (
              <div className={styles.highlightItem}>
                <span className={styles.highlightLabel}><FaComment size={16} /> Más Comentado</span>
                <a href={`https://youtube.com/watch?v=${highlights.mostCommented.id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <Card 
                    title={highlights.mostCommented.title} 
                    subtitle={`${formatStat(highlights.mostCommented.commentCount)} Comentarios`}
                  >
                    <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                      <img 
                        src={highlights.mostCommented.thumbnail} 
                        alt={highlights.mostCommented.title} 
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>
                  </Card>
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={styles.homeSocial}>
        <div className={styles.socialInvitation}>
          <span className={styles.homeSocialLabel}>Únete a Nuestra Comunidad</span>
          <p className={styles.socialDescription}>
            Seguir nuestras redes sociales es fundamental para estar conectado con los últimos estrenos, eventos exclusivos y contenido detrás de cámaras. Tu apoyo impulsa el crecimiento de la escena artística colombiana y ayuda a amplificar el talento de nuestros artistas. Sé parte de Este movimiento cultural.
          </p>
        </div>
        <div className={styles.socialLinks}>
          <Button href="https://instagram.com/entr3_line4s" variant="social">
            <FaInstagram />
            Instagram
          </Button>
          <Button href="https://www.youtube.com/@Entr3_Line4s" variant="social">
            <FaYoutube />
            YouTube
          </Button>
        </div>
      </div>
    </section>
  )
}