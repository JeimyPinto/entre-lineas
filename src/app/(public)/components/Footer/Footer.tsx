import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaYoutube, FaWhatsapp, FaEnvelope } from 'react-icons/fa6';
import { contactData } from '@/data/contact';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerBlocks}>
            {/* Brand */}
            <div className={styles.brandBlock}>
              <div className={styles.logoWrapper}>
                <Image
                  src="/1-01.png"
                  alt="Entre Líneas Logo"
                  width={48}
                  height={48}
                  priority
                />
                <div>
                  <span className={styles.brandName}>Entre Líneas</span>
                  <span className={styles.brandTag}>Cultura Urbana</span>
                </div>
              </div>
              <p className={styles.description}>
                Plataforma audiovisual y artística dedicada a la cultura urbana y el freestyle.
                Descentralizando el talento desde Manizales.
              </p>
            </div>

            {/* Navegación */}
            <div className={styles.linkBlock}>
              <h4 className={styles.blockTitle}>Navegación</h4>
              <ul className={styles.linksList}>
                <li><Link href="#inicio">Inicio</Link></li>
                <li><Link href="#historia">Historia</Link></li>
                <li><Link href="#galeria">Galería</Link></li>
                <li><Link href="#artistas">Artistas</Link></li>
                <li><Link href="#eventos">Eventos</Link></li>
                <li><Link href="#contacto">Contacto</Link></li>
              </ul>
            </div>

            {/* Contacto directo */}
            <div className={styles.linkBlock}>
              <h4 className={styles.blockTitle}>Contacto</h4>
              <ul className={styles.linksList}>
                <li><a href={`mailto:${contactData.email}`}>{contactData.email}</a></li>
                <li><a href={contactData.whatsapp.link} target="_blank" rel="noopener noreferrer">{contactData.whatsapp.number}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            © {currentYear} Entre Líneas. Todos los derechos reservados.
          </div>
          <div className={styles.socialIcons}>
            <a href={contactData.instagram.main.link} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialInsta}><FaInstagram /></a>
            <a href={contactData.platforms.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={styles.socialYt}><FaYoutube /></a>
            <a href={contactData.whatsapp.link} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={styles.socialWa}><FaWhatsapp /></a>
            <a href={`mailto:${contactData.email}`} aria-label="Email" className={styles.socialMail}><FaEnvelope /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
