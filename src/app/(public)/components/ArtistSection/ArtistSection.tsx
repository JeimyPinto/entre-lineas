"use client";
import { useState, useMemo } from "react";
import styles from "./ArtistSection.module.css";
import ArtistCard from "./ArtistCard";
import { FaXmark, FaInstagram, FaYoutube, FaFacebook, FaGlobe, FaTiktok } from "react-icons/fa6";
import Image from "next/image";
import Button from "@/shared/ui/Button/Button";
import { Artist } from "@/entities/artist/types";

interface ArtistSectionProps {
  initialArtists: Artist[];
}

export default function ArtistSection({ initialArtists }: ArtistSectionProps) {
  const [filter, setFilter] = useState("Todos");
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [artistsData] = useState<Artist[]>(initialArtists || []);

  const roles = useMemo(() => {
    const allRoles = artistsData.flatMap(a => a.orgRole);
    return ["Todos", ...Array.from(new Set(allRoles))];
  }, [artistsData]);

  const filteredArtists = useMemo(() => {
    if (filter === "Todos") return artistsData;
    return artistsData.filter(a => a.orgRole.includes(filter));
  }, [filter, artistsData]);

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <FaInstagram size={20} />;
      case 'youtube': return <FaYoutube size={20} />;
      case 'facebook': return <FaFacebook size={20} />;
      case 'tiktok': return <FaTiktok size={20} />;
      default: return <FaGlobe size={20} />;
    }
  };

  return (
    <div className={styles.artistsWrapper}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>Memorias de Artistas</h2>
        {artistsData.length > 0 ? (
          <p className={styles.subtitle}>Conoce los diferentes artistas que han participado en Entre Líneas y su trayectoria.</p>
        ) : (
          <p className={styles.subtitle}>No se pudieron cargar los artistas. Verifica tu conexión e inténtalo de nuevo.</p>
        )}

        {artistsData.length > 0 && (
          <div className={styles.filterBar}>
            {roles.map(role => (
              <button
                key={role}
                className={`${styles.filterChip} ${filter === role ? styles.activeChip : ""}`}
                onClick={() => setFilter(role)}
              >
                {role}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.artistsContainer}>
        {filteredArtists.map((artist) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            onOpenModal={setSelectedArtist}
          />
        ))}
      </div>

      {selectedArtist && (
        <div className={styles.modalOverlay} onClick={() => setSelectedArtist(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setSelectedArtist(null)}>
              <FaXmark size={24} />
            </button>

            <div className={styles.modalBody}>
              <div className={styles.modalImageWrapper} style={{ aspectRatio: `${selectedArtist.imageWidth ?? 1}/${selectedArtist.imageHeight ?? 1}` }}>
                <Image
                  src={selectedArtist.image || "/1-02.png"}
                  alt={selectedArtist.name}
                  fill
                  className={styles.modalImage}
                  style={{ objectPosition: `center ${selectedArtist.imagePosition || '50%'}` }}
                />
              </div>

              <div className={styles.modalInfo}>
                <div className={styles.modalHeader}>
                  <h2 className={styles.modalName}>{selectedArtist.name}</h2>
                  <div className={styles.tagContainer}>
                    {selectedArtist.orgRole.map((role, idx) => (
                      <span key={idx} className={styles.artistTag}>{role}</span>
                    ))}
                  </div>
                </div>

                <div className={styles.artistDetails}>
                  {selectedArtist.profession && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Profesión u Ocupación</span>
                      <span className={styles.detailValue}>{selectedArtist.profession}</span>
                    </div>
                  )}
                  {selectedArtist.origin && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Origen</span>
                      <span className={styles.detailValue}>{selectedArtist.origin}</span>
                    </div>
                  )}
                  {selectedArtist.trajectory && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Trayectoria</span>
                      <span className={styles.detailValue}>{selectedArtist.trajectory}</span>
                    </div>
                  )}
                </div>

                {selectedArtist.bio && selectedArtist.bio[0] !== "" && (
                  <div className={styles.artistBio}>
                    {selectedArtist.bio.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                )}

                {selectedArtist.socials && selectedArtist.socials.length > 0 && (
                  <div className={styles.socialContainer}>
                    {selectedArtist.socials.map((social, index) => (
                      social.url !== "https://www.instagram.com/" && (
                        <Button
                          key={index}
                          href={social.url}
                          variant="danger"
                        >
                          {getSocialIcon(social.platform)}
                          {social.label}
                        </Button>
                      )
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
