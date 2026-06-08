'use client';

import { FaFont, FaHeading, FaParagraph, FaTextWidth, FaFont as FaFontIcon } from 'react-icons/fa6';
import styles from './Typography.module.css';
import sectionStyles from './Section.module.css';

const typoSizes = [
  { name: 'Display', var: 'var(--font-display)', label: 'Títulos de Impacto / Hero', weight: 'var(--font-weight-black)', font: 'var(--font-title)' },
  { name: 'H1', var: 'var(--font-h1)', label: 'Encabezados de Sección', weight: 'var(--font-weight-bold)', font: 'var(--font-title)' },
  { name: 'H2', var: 'var(--font-h2)', label: 'Sub-encabezados', weight: 'var(--font-weight-bold)', font: 'var(--font-title)' },
  { name: 'H3', var: 'var(--font-h3)', label: 'Títulos de Artículos/Cards', weight: 'var(--font-weight-semibold)', font: 'var(--font-title)' },
  { name: 'H4', var: 'var(--font-h4)', label: 'Navegación / Overlays', weight: 'var(--font-weight-medium)', font: 'var(--font-title)' },
  { name: 'Body Large', var: 'var(--font-body-lg)', label: 'Introducciones', weight: 'var(--font-weight-normal)', font: 'var(--font-main)' },
  { name: 'Body', var: 'var(--font-body)', label: 'Texto de Párrafo General', weight: 'var(--font-weight-normal)', font: 'var(--font-main)' },
  { name: 'Small', var: 'var(--font-small)', label: 'Metadatos / Notas', weight: 'var(--font-weight-normal)', font: 'var(--font-main)' },
  { name: 'XS', var: 'var(--font-xs)', label: 'Captions / Legal', weight: 'var(--font-weight-normal)', font: 'var(--font-main)' },
];

const fontFamilies = [
  { name: 'Cloister (Títulos)', var: 'var(--font-title)', preview: 'Entre Líneas', weight: 'var(--font-weight-bold)' },
  { name: 'Esteban (Cuerpo)', var: 'var(--font-main)', preview: 'Cuidamos la forma y el fondo.', weight: 'var(--font-weight-normal)' },
];

const weights = [
  { name: 'Normal', var: 'var(--font-weight-normal)', value: '400' },
  { name: 'Medium', var: 'var(--font-weight-medium)', value: '500' },
  { name: 'Semibold', var: 'var(--font-weight-semibold)', value: '600' },
  { name: 'Bold', var: 'var(--font-weight-bold)', value: '700' },
  { name: 'Black', var: 'var(--font-weight-black)', value: '900' },
];

export function Typography() {
  return (
    <section className="section">
      <div className="sectionHeader">
        <FaFont className="sectionIcon" />
        <h2 className="sectionTitle">Sistema Tipográfico Completo</h2>
      </div>
      
      <p style={{ color: '#a4a4a4', marginBottom: '32px', lineHeight: 1.7, maxWidth: '800px' }}>
        Sistema tipográfico dual: <strong style={{ color: '#dc2626' }}>Cloister Black</strong> para títulos 
        (personalidad, impacto) y <strong style={{ color: '#dc2626' }}>Esteban</strong> para cuerpo 
        (legibilidad, calidez). 9 niveles de escala + 5 pesos + variables CSS fluidas (clamp).
      </p>

      {/* Font Families */}
      <div className={styles.fontFamilySection}>
        <h3 className={styles.subSectionTitle}>
          <FaFontIcon size={16} style={{ marginRight: '8px', color: '#dc2626' }} />
          Familias Tipográficas
        </h3>
        <div className={styles.fontFamilyGrid}>
          {fontFamilies.map(font => (
            <div key={font.name} className={styles.fontFamilyCard}>
              <div className={styles.fontFamilyHeader}>
                <span className={styles.fontFamilyName}>{font.name}</span>
                <code className={styles.fontFamilyVar}>{font.var}</code>
              </div>
              <p 
                className={styles.fontFamilyPreview} 
                style={{ fontFamily: font.var, fontWeight: font.weight }}
              >
                {font.preview}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Weights */}
      <div className={styles.fontFamilySection} style={{ marginTop: '32px' }}>
        <h3 className={styles.subSectionTitle}>
          <FaTextWidth size={16} style={{ marginRight: '8px', color: '#dc2626' }} />
          Pesos Disponibles
        </h3>
        <div className={styles.weightsGrid}>
          {weights.map(w => (
            <div key={w.name} className={styles.weightCard}>
              <span className={styles.weightName}>{w.name}</span>
              <code className={styles.weightVar}>{w.var}</code>
              <span className={styles.weightValue}>{w.value}</span>
              <p className={styles.weightPreview} style={{ fontWeight: w.var }}>
                Entre Líneas - Peso {w.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scale */}
      <div className={styles.fontFamilySection} style={{ marginTop: '32px' }}>
        <h3 className={styles.subSectionTitle}>
          <FaHeading size={16} style={{ marginRight: '8px', color: '#dc2626' }} />
          Escala Tipográfica Fluida (9 Niveles)
        </h3>
        <p style={{ color: '#888', marginBottom: '20px', fontSize: '0.85rem' }}>
          Tamaños usando <code style={{ color: '#dc2626' }}>clamp()</code> para escalado fluido entre móvil y desktop.
          Las variables responden a <code style={{ color: '#dc2626' }}>vw</code> con límites mínimos/máximos.
        </p>
        <div className={styles.typoScaleList}>
          {typoSizes.map(size => (
            <div key={size.name} className={styles.typoScaleItem}>
              <div className={styles.typoScaleMeta}>
                <span className={styles.sizeName}>{size.name}</span>
                <code className={styles.sizeVar}>{size.var}</code>
                <span className={styles.sizeValue}>{size.label}</span>
              </div>
              <p 
                className={styles.typoScalePreview} 
                style={{ 
                  fontSize: size.var, 
                  fontWeight: size.weight,
                  fontFamily: size.font
                }}
              >
                {size.name === 'Display' ? 'Entre Líneas' : 'Cuidamos la forma y el fondo.'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Examples */}
      <div className={styles.fontFamilySection} style={{ marginTop: '32px' }}>
        <h3 className={styles.subSectionTitle}>
          <FaParagraph size={16} style={{ marginRight: '8px', color: '#dc2626' }} />
          Ejemplos de Uso en Contexto
        </h3>
        <div className={styles.usageExamples}>
          <div className={styles.usageCard}>
            <h4 style={{ fontFamily: 'var(--font-title)', fontSize: 'var(--font-h3)', fontWeight: 'var(--font-weight-bold)', marginBottom: '12px', color: '#dc2626' }}>
              Hero Section
            </h4>
            <h1 style={{ fontFamily: 'var(--font-title)', fontSize: 'var(--font-display)', fontWeight: 'var(--font-weight-black)', marginBottom: '16px', lineHeight: 1.1 }}>
              Entre Líneas
            </h1>
            <p style={{ fontFamily: 'var(--font-main)', fontSize: 'var(--font-body-lg)', color: '#a4a4a4', lineHeight: 1.7, maxWidth: '500px' }}>
              Plataforma oficial del colectivo colombiano. Proyectamos y difundimos el talento urbano mediante experiencias digitales modernas.
            </p>
          </div>
          
          <div className={styles.usageCard}>
            <h4 style={{ fontFamily: 'var(--font-title)', fontSize: 'var(--font-h3)', fontWeight: 'var(--font-weight-bold)', marginBottom: '12px', color: '#dc2626' }}>
              Article Card
            </h4>
            <h2 style={{ fontFamily: 'var(--font-title)', fontSize: 'var(--font-h3)', fontWeight: 'var(--font-weight-semibold)', marginBottom: '8px' }}>
              Final Nacional 2024
            </h2>
            <p style={{ fontFamily: 'var(--font-main)', fontSize: 'var(--font-small)', color: '#a4a4a4', marginBottom: '12px' }}>
              Manizales, Colombia · 15 Marzo 2024
            </p>
            <p style={{ fontFamily: 'var(--font-main)', fontSize: 'var(--font-body)', color: '#e5e5e5', lineHeight: 1.7 }}>
              La gran final del circuito nacional reunió a los 16 mejores freestylers del país en una jornada histórica.
            </p>
          </div>
          
          <div className={styles.usageCard}>
            <h4 style={{ fontFamily: 'var(--font-title)', fontSize: 'var(--font-h3)', fontWeight: 'var(--font-weight-bold)', marginBottom: '12px', color: '#dc2626' }}>
              Metadata / UI
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-main)', fontSize: 'var(--font-xs)', background: 'rgba(220,38,38,0.15)', color: '#dc2626', padding: '4px 10px', borderRadius: 'var(--radius-pill)' }}>
                EVENTO
              </span>
              <span style={{ fontFamily: 'var(--font-main)', fontSize: 'var(--font-xs)', background: 'rgba(255,255,255,0.05)', color: '#a4a4a4', padding: '4px 10px', borderRadius: 'var(--radius-pill)' }}>
                PRESENCIAL
              </span>
              <span style={{ fontFamily: 'var(--font-main)', fontSize: 'var(--font-xs)', color: '#525252' }}>
                Actualizado hace 2h
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
