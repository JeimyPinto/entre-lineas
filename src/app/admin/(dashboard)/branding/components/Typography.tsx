'use client';

import { FaFont, FaHeading, FaParagraph, FaTextWidth, FaFont as FaFontIcon } from 'react-icons/fa6';
import styles from './Typography.module.css';

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
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <FaFont className={styles.sectionIcon} aria-hidden="true" />
        <h2 className={styles.sectionTitle}>Sistema Tipográfico Completo</h2>
      </div>
      
      <p className={styles.sectionDescription}>
        Sistema tipográfico dual: <strong>Cloister Black</strong> para títulos 
        (personalidad, impacto) y <strong>Esteban</strong> para cuerpo 
        (legibilidad, calidez). 9 niveles de escala + 5 pesos + variables CSS fluidas (clamp).
      </p>

      {/* Font Families */}
      <div className={styles.fontFamilySection}>
        <h3 className={styles.subSectionTitle}>
          <FaFontIcon size={16} aria-hidden="true" />
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
      <div className={styles.fontFamilySection} style={{ marginTop: 'var(--margin-xxxl)' }}>
        <h3 className={styles.subSectionTitle}>
          <FaTextWidth size={16} aria-hidden="true" />
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
      <div className={styles.fontFamilySection} style={{ marginTop: 'var(--margin-xxxl)' }}>
        <h3 className={styles.subSectionTitle}>
          <FaHeading size={16} aria-hidden="true" />
          Escala Tipográfica Fluida (9 Niveles)
        </h3>
        <p style={{ color: 'var(--color-text-subtle)', marginBottom: 'var(--margin-xl)', fontSize: 'var(--font-small)' }}>
          Tamaños usando <code style={{ color: 'var(--color-accent)' }}>clamp()</code> para escalado fluido entre móvil y desktop.
          Las variables responden a <code style={{ color: 'var(--color-accent)' }}>vw</code> con límites mínimos/máximos.
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
      <div className={styles.fontFamilySection} style={{ marginTop: 'var(--margin-xxxl)' }}>
        <h3 className={styles.subSectionTitle}>
          <FaParagraph size={16} aria-hidden="true" />
          Ejemplos de Uso en Contexto
        </h3>
        <div className={styles.usageExamples}>
          <div className={styles.usageCard}>
            <h4 className={styles.usageCardTitle}>
              Hero Section
            </h4>
            <h1 className={styles.usageCardHero}>
              Entre Líneas
            </h1>
            <p className={styles.usageCardBody}>
              Plataforma oficial del colectivo colombiano. Proyectamos y difundimos el talento urbano mediante experiencias digitales modernas.
            </p>
          </div>
          
          <div className={styles.usageCard}>
            <h4 className={styles.usageCardTitle}>
              Article Card
            </h4>
            <h2 className={styles.usageCardArticleTitle}>
              Final Nacional 2024
            </h2>
            <p className={styles.usageCardMeta}>
              Manizales, Colombia · 15 Marzo 2024
            </p>
            <p className={styles.usageCardBodyText}>
              La gran final del circuito nacional reunió a los 16 mejores freestylers del país en una jornada histórica.
            </p>
          </div>
          
          <div className={styles.usageCard}>
            <h4 className={styles.usageCardTitle}>
              Metadata / UI
            </h4>
            <div className={styles.usageCardTags}>
              <span className={`${styles.usageCardTag} ${styles.usageCardTagPrimary}`}>
                EVENTO
              </span>
              <span className={`${styles.usageCardTag} ${styles.usageCardTagSecondary}`}>
                PRESENCIAL
              </span>
              <span className={`${styles.usageCardTag} ${styles.usageCardTagMuted}`}>
                Actualizado hace 2h
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}