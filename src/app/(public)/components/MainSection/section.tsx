"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/shared/ui/Button/Button";
import Card from "@/shared/ui/Card/Card";
import { FaInstagram, FaYoutube, FaHeart, FaComment, FaFire, FaUsers, FaMusic, FaMicrophone } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

import { useInterval } from "@/hooks/useInterval";
import styles from "./section.module.css";

import { Video } from '@/entities';

interface Highlights {
  viral: Video | null;
  mostLiked: Video | null;
  mostCommented: Video | null;
}

interface SocialStats {
  instagram: { followers: string; posts: string; engagement: string };
  youtube: { subscribers: string; videos: string; views: string };
}

interface MainSectionProps {
  highlights: Highlights | null;
  socialStats?: SocialStats;
}

const socialStatsDefault: SocialStats = {
  instagram: { followers: "12.5K", posts: "890+", engagement: "4.2%" },
  youtube: { subscribers: "8.3K", videos: "240+", views: "2.1M+" },
};

export default function MainSection({ highlights, socialStats = socialStatsDefault }: MainSectionProps) {
  const formatStat = (value: string | number | undefined) => {
    const num = Number(value);
    return isNaN(num) ? "0" : num.toLocaleString("es-CO");
  };
  
  const [logoIndex, setLogoIndex] = useState(0);
  const [showSocialProof, setShowSocialProof] = useState(false);
  const logos = ["/1-01.png", "/1-02.png", "/1-03.png", "/1-04.png"];

  useInterval(() => {
    setLogoIndex((prev) => (prev + 1) % logos.length);
  }, 4000);

  // Trigger social proof animation when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setShowSocialProof(true), 300);
          }
        });
      },
      { threshold: 0.3 }
    );

    const socialSection = document.querySelector('.homeSocial');
    if (socialSection) observer.observe(socialSection);

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.homeSection} aria-labelledby="main-section-title">
      <div className={styles.homeAbout}>
        <div className={styles.logoContainer}>
          <Image 
            src={logos[logoIndex]}
            alt="Logo Animado Entre Líneas"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            loading="eager"
            priority
            fetchPriority="high"
            style={{ objectFit: "contain" }}
          />
        </div>
        <h2 id="main-section-title" className={styles.homeTitle}>¿Quiénes somos?</h2>
        <p className={styles.homeDescription}>
          Entre Líneas es un proyecto audiovisual y artístico dedicado a promover y difundir la cultura, 
          así como el talento de artistas, freestylers y músicos colombianos.
        </p>
      </div>

      {highlights && (
        <motion.div 
          className={styles.homeHighlights}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className={styles.highlightsTitle}>Hitos del Canal</h3>
          <div className={styles.highlightsGrid}>
            {highlights.viral && (
              <HighlightCard
                icon={<FaFire size={18} />}
                label="Más Viral"
                video={highlights.viral}
                stat={formatStat(highlights.viral.viewCount)}
                statLabel="Visualizaciones"
                color="var(--color-accent)"
              />
            )}
            {highlights.mostLiked && (
              <HighlightCard
                icon={<FaHeart size={16} />}
                label="Más Gustado"
                video={highlights.mostLiked}
                stat={formatStat(highlights.mostLiked.likeCount)}
                statLabel="Likes"
                color="#E91E63"
              />
            )}
            {highlights.mostCommented && (
              <HighlightCard
                icon={<FaComment size={16} />}
                label="Más Comentado"
                video={highlights.mostCommented}
                stat={formatStat(highlights.mostCommented.commentCount)}
                statLabel="Comentarios"
                color="#2196F3"
              />
            )}
          </div>
        </motion.div>
      )}

      <motion.div 
        className={styles.homeSocial}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className={styles.socialInvitation}>
          <div className={styles.invitationHeader}>
            <span className={styles.homeSocialLabel}>Únete a Nuestra Comunidad</span>
            <div className={styles.communityBadges}>
              <span className={styles.badge}><FaUsers size={14} /> 25+ Ediciones</span>
              <span className={styles.badge}><FaMusic size={14} /> 150+ Artistas</span>
              <span className={styles.badge}><FaMicrophone size={14} /> Freestyle & Música</span>
            </div>
          </div>
          <p className={styles.socialDescription}>
            Seguir nuestras redes sociales es fundamental para estar conectado con los últimos estrenos, 
            eventos exclusivos y contenido detrás de cámaras. Tu apoyo impulsa el crecimiento de la 
            escena artística colombiana y ayuda a amplificar el talento de nuestros artistas. 
            <strong>Sé parte de este movimiento cultural.</strong>
          </p>
        </div>

        {/* Social Proof Stats */}
        <AnimatePresence mode="wait">
          {showSocialProof && (
            <motion.div
              className={styles.socialProof}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              <div className={styles.statsGrid}>
                <StatCard
                  icon={<FaInstagram size={24} />}
                  platform="Instagram"
                  stats={[
                    { value: socialStats.instagram.followers, label: "Seguidores" },
                    { value: socialStats.instagram.posts, label: "Publicaciones" },
                    { value: socialStats.instagram.engagement, label: "Engagement" },
                  ]}
                  color="#E4405F"
                  gradient="linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)"
                />
                <StatCard
                  icon={<FaYoutube size={24} />}
                  platform="YouTube"
                  stats={[
                    { value: socialStats.youtube.subscribers, label: "Suscriptores" },
                    { value: socialStats.youtube.videos, label: "Videos" },
                    { value: socialStats.youtube.views, label: "Visualizaciones" },
                  ]}
                  color="#FF0000"
                  gradient="linear-gradient(45deg, #FF0000 0%, #CC0000 100%)"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.socialLinks}>
          <SocialButton
            href="https://instagram.com/entr3_line4s"
            icon={<FaInstagram />}
            label="Instagram"
            platform="instagram"
            stats={socialStats.instagram}
            gradient="linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)"
          />
          <SocialButton
            href="https://www.youtube.com/@Entr3_Line4s"
            icon={<FaYoutube />}
            label="YouTube"
            platform="youtube"
            stats={socialStats.youtube}
            gradient="linear-gradient(45deg, #FF0000 0%, #CC0000 100%)"
          />
        </div>
      </motion.div>
    </section>
  );
}

// Highlight Card Component
function HighlightCard({ 
  icon, 
  label, 
  video, 
  stat, 
  statLabel, 
  color 
}: { 
  icon: React.ReactNode; 
  label: string; 
  video: Video; 
  stat: string; 
  statLabel: string; 
  color: string; 
}) {
  return (
    <motion.div 
      className={styles.highlightItem}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <span className={styles.highlightLabel} style={{ color }}>
        {icon} {label}
      </span>
      <a 
        href={`https://youtube.com/watch?v=${video.id}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ textDecoration: 'none' }}
        aria-label={`Ver ${label}: ${video.title}`}
      >
        <Card 
          title={video.title} 
          subtitle={`${stat} ${statLabel}`}
        >
          <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
              loading="lazy"
            />
            <div className={styles.playOverlay}>
              <svg viewBox="0 0 24 24" width="48" height="48" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </Card>
      </a>
    </motion.div>
  );
}

// Social Proof Stat Card
function StatCard({ 
  icon, 
  platform, 
  stats, 
  color, 
  gradient 
}: { 
  icon: React.ReactNode; 
  platform: string; 
  stats: { value: string; label: string }[]; 
  color: string; 
  gradient: string; 
}) {
  return (
    <motion.div className={styles.statCard}>
      <div className={styles.statCardHeader} style={{ background: gradient }}>
        <div className={styles.statIcon} style={{ color }}>
          {icon}
        </div>
        <span className={styles.statPlatform}>{platform}</span>
      </div>
      <div className={styles.statCardBody}>
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.label} 
            className={styles.statItem}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className={styles.statValue} style={{ color }}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Enhanced Social Button with stats preview
function SocialButton({ 
  href, 
  icon, 
  label, 
  platform, 
  stats, 
  gradient 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string; 
  platform: string; 
  stats: { followers: string; posts: string; engagement: string } | { subscribers: string; videos: string; views: string };
  gradient: string;
}) {
  const isInstagram = platform === "instagram";
  const primaryStat = isInstagram ? (stats as { followers: string }).followers : (stats as { subscribers: string }).subscribers;
  const primaryLabel = isInstagram ? "seguidores" : "suscriptores";

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.socialButton}
      style={{ 
        '--social-gradient': gradient,
        '--social-color': isInstagram ? '#E4405F' : '#FF0000'
      } as React.CSSProperties}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Seguir Entre Líneas en ${label}`}
    >
      <div className={styles.buttonIconWrapper}>
        <span className={styles.buttonIcon}>{icon}</span>
        <span className={styles.buttonGlow} />
      </div>
      <div className={styles.buttonContent}>
        <span className={styles.buttonLabel}>{label}</span>
        <span className={styles.buttonStat}>
          <span className={styles.statNumber}>{primaryStat}</span>
          <span className={styles.statText}>{primaryLabel}</span>
        </span>
      </div>
      <span className={styles.buttonArrow}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M9.29 15.88L13.17 12 9.29 8.12 10.71 6.7l6.36 6.36-6.36 6.36L9.29 15.88z"/>
        </svg>
      </span>
    </motion.a>
  );
}