"use client";

import React from 'react';
import { 
  FaEnvelope, 
  FaWhatsapp, 
  FaInstagram, 
  FaYoutube, 
  FaTiktok,
  FaMusic
} from 'react-icons/fa6';
import Image from 'next/image';
import Card from '@/shared/ui/Card/Card';
import { contactData } from '@/data/contact';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <section className={styles.contactSection} id="contacto">
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <Image 
            src="/1-04.png" 
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
          <div className={styles.contactCardWrapper}>
            <Card 
              title="Correo Electrónico" 
              icon={<FaEnvelope />}
              className={styles.cardInner}
            >
              <ul className={styles.infoList}>
                <li className={styles.infoItem}>
                  <a href={`mailto:${contactData.email}`} className={styles.link}>
                    {contactData.email}
                  </a>
                </li>
              </ul>
            </Card>
          </div>

          {/* WhatsApp Card */}
          <div className={styles.contactCardWrapper}>
            <Card 
              title="WhatsApp" 
              icon={<FaWhatsapp />}
              className={styles.cardInner}
            >
              <ul className={styles.infoList}>
                <li className={styles.infoItem}>
                  <a 
                    href={contactData.whatsapp.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${styles.link} ${styles.whatsappLink}`}
                  >
                    {contactData.whatsapp.number}
                  </a>
                </li>
              </ul>
            </Card>
          </div>

          {/* Instagram Card */}
          <div className={styles.contactCardWrapper}>
            <Card 
              title="Instagram" 
              icon={<FaInstagram />}
              className={styles.cardInner}
            >
              <ul className={styles.infoList}>
                <li className={styles.infoItem}>
                  <a 
                    href={contactData.instagram.main.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {contactData.instagram.main.handle}
                  </a>
                </li>
                <li className={styles.infoItem}>
                  <a 
                    href={contactData.instagram.founder.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {contactData.instagram.founder.handle}
                  </a>
                </li>
              </ul>
            </Card>
          </div>

          {/* Platforms Card */}
          <div className={styles.contactCardWrapper}>
            <Card 
              title="Plataformas Digitales" 
              subtitle="Galáctico / Entre Líneas Manizales" 
              icon={<FaMusic />}
              className={styles.cardInner}
            >
              <div className={styles.platformsGrid}>
                <a 
                  href={contactData.platforms.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.platformIcon} 
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>
                <a 
                  href={contactData.platforms.tiktok} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.platformIcon} 
                  aria-label="TikTok"
                >
                  <FaTiktok />
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;