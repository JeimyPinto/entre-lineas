"use client";
import Image from "next/image";
import styles from "./ArtistSection.module.css";
import Button from "./ui/Button";
import { FaInstagram } from "react-icons/fa6";

export default function ArtistSection() {
  const instagramUrl = process.env.NEXT_PUBLIC_GALACTICO_INSTAGRAM || "https://instagram.com/";

  return (
    <section className={styles.artistSection}>
      <div className={styles.imageContainer}>
        <Image
          src="/artists/galactico.png"
          alt="Galáctico - Fundador Entre Líneas"
          fill
          className={styles.artistImage}
          priority
        />
      </div>

      <div className={styles.contentContainer}>
        <span className={styles.artistTag}>Fundador de la Organización</span>
        <h2 className={styles.artistName}>Galáctico</h2>
        
        <div className={styles.artistDetails}>
          <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Profesión</span>
                <span className={styles.detailValue}>Abogado</span>
          </div>
          <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Origen</span>
                <span className={styles.detailValue}>Manizales, Colombia</span>
          </div>
          <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Trayectoria</span>
                <span className={styles.detailValue}>Desde 2020</span>
          </div>
        </div>

        <div className={styles.artistBio}>
          <p>
            Artista originario de la ciudad de Manizales, cuya carrera artística comienza a partir del año 2020.
          </p>
          <p>
            Enfocado en el desarrollo musical, lírico, artístico, pedagógico y profesional, e influenciado por la Cultura Hip-Hop, la Poesía y la Rítmica.
          </p>
          <p>
            Convergiendo en el proyecto artístico que lo caracteriza.
          </p>
        </div>

        <div className={styles.socialContainer}>
          <Button 
            href={instagramUrl} 
            variant="outline"
          >
            <FaInstagram size={22} />
            Seguir en Instagram
          </Button>
        </div>
      </div>
    </section>
  );
}
