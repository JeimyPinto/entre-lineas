"use client";

import React from 'react';
import { 
  FaEnvelope, 
  FaWhatsapp, 
  FaInstagram, 
  FaYoutube, 
  FaSpotify, 
  FaTiktok,
  FaMusic
} from 'react-icons/fa';
import Image from 'next/image';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <section className={styles.contactSection} id="contacto">
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <Image 
            src="/1-05.png" 
            alt="Logo Entre Líneas" 
            width={100} 
            height={140} 
            className={styles.contactLogo}
          />
          <h2 className={styles.title}>¡Hagamos Conexión!</h2>
          <p className={styles.invitation}>
            Tu apoyo es el motor que impulsa este proyecto urbano.
            <br />
            Síguenos en nuestras redes sociales y sé parte de la comunidad.
            <strong> ¡Cada seguidor es un gran apoyo para nosotros! </strong>
          </p>
        </div>
        <div className={styles.grid}>
          {/* Email Card */}
          <div className={styles.card}>
            <FaEnvelope className={styles.icon} />
            <h3 className={styles.cardTitle}>Correo Electrónico</h3>
            <ul className={styles.infoList}>
              <li className={styles.infoItem}>
                <a href="mailto:entr3line4s@gmail.com" className={styles.link}>
                  entr3line4s@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* WhatsApp Card */}
          <div className={styles.card}>
            <FaWhatsapp className={styles.icon} />
            <h3 className={styles.cardTitle}>WhatsApp</h3>
            <ul className={styles.infoList}>
              <li className={styles.infoItem}>
                <a 
                  href="https://wa.me/573192749317" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  +57 319 274 9317
                </a>
              </li>
            </ul>
          </div>

          {/* Instagram Card */}
          <div className={styles.card}>
            <FaInstagram className={styles.icon} />
            <h3 className={styles.cardTitle}>Instagram</h3>
            <ul className={styles.infoList}>
              <li className={styles.infoItem}>
                <a 
                  href="https://instagram.com/_mr_galactico_" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  @_mr_galactico_
                </a>
              </li>
              <li className={styles.infoItem}>
                <a 
                  href="https://instagram.com/entr3_line4s" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  @entr3_line4s
                </a>
              </li>
            </ul>
          </div>

          {/* Platforms Card */}
          <div className={styles.card}>
            <FaMusic className={styles.icon} />
            <h3 className={styles.cardTitle}>Plataformas Digitales</h3>
            <p className={styles.platformsSubtitle}>
              Galáctico / Entre Líneas Manizales
            </p>
            <div className={styles.platformsGrid}>
              <a href="#" className={styles.platformIcon} aria-label="YouTube">
                <FaYoutube />
              </a>
              <a href="#" className={styles.platformIcon} aria-label="Spotify">
                <FaSpotify />
              </a>
              <a href="#" className={styles.platformIcon} aria-label="TikTok">
                <FaTiktok />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
