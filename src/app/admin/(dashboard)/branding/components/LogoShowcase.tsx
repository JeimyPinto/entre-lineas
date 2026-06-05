'use client';

import Image from 'next/image';
import { FaImage } from 'react-icons/fa6';
import styles from './LogoShowcase.module.css';
import sectionStyles from './Section.module.css';
import BlinkingLogo from '@/components/ui/BlinkingLogo';

export function LogoShowcase() {
  return (
    <section className="section">
      <div className="sectionHeader">
        <FaImage className="sectionIcon" />
        <h2 className="sectionTitle">Simbología del Ojo</h2>
      </div>
      
      <div className={styles.brandingGrid}>
        {/* Fondos Claros */}
        <div className={styles.logoGroup}>
          <h3 style={{ fontSize: '0.85rem', color: '#dc2626', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Para Fondos Claros
          </h3>
          <div className={styles.logoRow}>
            <div className={styles.logoItem}>
              <div className={styles.logoPreviewLight}>
                <Image src="/1-01.png" alt="Ojo" width={50} height={70} style={{ width: 'auto', height: 'auto' }} />
              </div>
              <span>Semi-cerrado</span>
            </div>
            <div className={styles.logoItem}>
              <div className={styles.logoPreviewLight}>
                <Image src="/1-04.png" alt="Ojo" width={50} height={70} style={{ width: 'auto', height: 'auto' }} />
              </div>
              <span>Abierto</span>
            </div>
            <div className={styles.logoItem}>
              <div className={styles.logoPreviewLight}>
                <BlinkingLogo closedImg="/1-01.png" openImg="/1-04.png" size={40} />
              </div>
              <span style={{ color: '#dc2626' }}>Animación</span>
            </div>
          </div>
        </div>

        {/* Fondos Oscuros */}
        <div className={styles.logoGroup}>
          <h3 style={{ fontSize: '0.85rem', color: '#dc2626', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Para Fondos Oscuros
          </h3>
          <div className={styles.logoRow}>
            <div className={styles.logoItem}>
              <div className={styles.logoPreviewDark}>
                <Image src="/1-02.png" alt="Ojo" width={50} height={70} style={{ width: 'auto', height: 'auto' }} />
              </div>
              <span>Semi-cerrado</span>
            </div>
            <div className={styles.logoItem}>
              <div className={styles.logoPreviewDark}>
                <Image src="/1-03.png" alt="Ojo" width={50} height={70} style={{ width: 'auto', height: 'auto' }} />
              </div>
              <span>Abierto</span>
            </div>
            <div className={styles.logoItem}>
              <div className={styles.logoPreviewDark}>
                <BlinkingLogo closedImg="/1-02.png" openImg="/1-03.png" size={40} />
              </div>
              <span style={{ color: '#dc2626' }}>Animación</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
