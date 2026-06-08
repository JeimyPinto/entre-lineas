'use client';

import { FaShapes, FaInstagram } from 'react-icons/fa6';
import Image from 'next/image';
import styles from './ComponentsShowcase.module.css';
import sectionStyles from './Section.module.css';
import Button from '@/shared/ui/Button/Button';
import Card from '@/shared/ui/Card/Card';
import InstagramCard from '@/shared/ui/InstagramCard/InstagramCard';

export function ComponentsShowcase() {
  return (
    <section className="section">
      <div className="sectionHeader">
        <FaShapes className="sectionIcon" />
        <h2 className="sectionTitle">Catálogo de Componentes</h2>
      </div>
      
      <div className={styles.uiShowcase}>
        <div className={styles.uiColumn}>
          <span className={styles.uiLabel}>Botones</span>
          <div className={styles.uiContent}>
            <Button variant="primary">Principal</Button>
            <Button variant="secondary">Secundario</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="social">
              <FaInstagram /> Instagram
            </Button>
          </div>
        </div>
      </div>
      
      <div className={styles.cardShowcase} style={{ marginTop: '32px' }}>
        <div className={styles.cardPreviewItem}>
          <span className={styles.uiLabel}>Standard Card</span>
          <div style={{ width: '100%', maxWidth: '320px' }}>
            <Card title="Final Nacional 2023" subtitle="Manizales, Colombia">
              <div style={{ padding: '1rem', display: 'flex', justifyContent: 'center' }}>
                <Image 
                  src="/Entre-lineas-logo.png" 
                  alt="Logo" 
                  width={150} 
                  height={80} 
                  style={{ objectFit: 'contain' }} 
                />
              </div>
            </Card>
          </div>
        </div>
        
        <div className={styles.cardPreviewItem}>
          <span className={styles.uiLabel}>Instagram Event Card</span>
          <div style={{ width: '100%', maxWidth: '350px' }}>
            <InstagramCard 
              title="Demo Branding Event"
              date="Domingo 12 Abril"
              location="Sede Central"
              postUrl="#"
              youtubeLink="#"
              judges={[{ name: "Judge One" }]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
