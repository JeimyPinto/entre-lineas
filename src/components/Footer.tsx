import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import { FaInstagram, FaYoutube, FaWhatsapp, FaEnvelope, FaFingerprint } from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={`${styles.topSection} mobile-single-column`}>
          <div className={styles.brandInfo}>
            <div className={styles.logoWrapper}>
              <Image 
                src="/1-01.png" 
                alt="Entre Líneas Logo" 
                width={50} 
                height={65} 
                style={{ height: 'auto' }}
              />
              <span className={styles.brandName}>Entre Líneas</span>
            </div>
            <p className={styles.description}>
              Plataforma audiovisual y artística dedicada a la cultura urbana y el freestyle. 
              Descentralizando el talento, construyendo hermandad.
            </p>
          </div>

          <div className={`${styles.linksGrid} mobile-single-column`}>
            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Navegación</h4>
              <ul className={styles.linksList}>
                <li><Link href="#inicio">Inicio</Link></li>
                <li><Link href="#historia">Historia</Link></li>
                <li><Link href="#galeria">Galería</Link></li>
                <li><Link href="#artistas">Artistas</Link></li>
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Legales</h4>
              <ul className={styles.linksList}>
                {/* User requested corporate identity here */}
                <li>
                  <Link href="/branding" className={styles.brandingLink}>
                    <FaFingerprint size={14} style={{ marginRight: '8px' }} />
                    Identidad Corporativa
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            © {currentYear} Entre Líneas. Todos los derechos reservados.
          </div>
          <div className={styles.socialIcons}>
            <a href="https://instagram.com/entr3_line4s" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            <a href="https://wa.me/573192749317" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
            <a href="mailto:entr3line4s@gmail.com"><FaEnvelope /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
