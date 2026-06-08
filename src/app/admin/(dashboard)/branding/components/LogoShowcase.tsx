'use client';

import Image from 'next/image';
import { FaImage, FaEye, FaEyeSlash, FaArrowsUpDownLeftRight, FaCopy, FaCheck, FaXmark, FaPalette, FaCircleInfo } from 'react-icons/fa6';
import styles from './LogoShowcase.module.css';
import sectionStyles from './Section.module.css';
import BlinkingLogo from '@/shared/ui/BlinkingLogo/BlinkingLogo';

const logoVariants = [
  { id: '1-01', name: 'Semi-cerrado', desc: 'Estado reposo / sutil', bg: 'light' },
  { id: '1-02', name: 'Semi-cerrado (dark)', desc: 'Estado reposo / sutil', bg: 'dark' },
  { id: '1-03', name: 'Abierto (dark)', desc: 'Estado activo / atención', bg: 'dark' },
  { id: '1-04', name: 'Abierto', desc: 'Estado activo / atención', bg: 'light' },
];

const usageGuidelines = [
  { title: 'Espacio de Respeto', desc: 'Mantén un área libre equivalente al 50% del ancho del logo alrededor. No coloques elementos gráficos ni texto en esta zona.', icon: <FaArrowsUpDownLeftRight size={18} />, status: 'ok' },
  { title: 'No Deformar', desc: 'Mantén siempre la proporción original (aspect ratio). No estires, aplastes ni rotaciones el logo.', icon: <FaXmark size={18} />, status: 'error' },
  { title: 'Fondos Apropiados', desc: 'Usa la versión light sobre fondos oscuros y la versión dark sobre fondos claros. Nunca inviertas los colores manualmente.', icon: <FaPalette size={18} />, status: 'ok' },
  { title: 'Tamaño Mínimo', desc: 'El logo no debe reproducirse a menos de 32px de altura (versión estática) o 48px (versión animada) para mantener legibilidad.', icon: <FaCircleInfo size={18} />, status: 'info' },
  { title: 'Animación', desc: 'El parpadeo es sutil (3-4s ciclo). Úsalo solo en hero, loading states o elementos de marca principales. No abuses.', icon: <FaEye size={18} />, status: 'ok' },
  { title: 'No Efectos Extra', desc: 'No añadas sombras, outlines, gradientes, glow ni efectos CSS al logo. El diseño es intencionalmente plano.', icon: <FaXmark size={18} />, status: 'error' },
];

export function LogoShowcase() {
  return (
    <section className="section">
      <div className="sectionHeader">
        <FaImage className="sectionIcon" />
        <h2 className="sectionTitle">Simbología del Ojo - Sistema Visual</h2>
      </div>
      
      <p style={{ color: '#a4a4a4', marginBottom: '32px', lineHeight: 1.7, maxWidth: '800px' }}>
        El ojo es el símbolo central de Entre Líneas: <strong style={{ color: '#dc2626' }}>observar, escuchar, estar atento</strong>. 
        Dos estados (semi-cerrado/abierto) representan la dualidad entre <em>escucha activa</em> y <em>expresión libre</em>. 
        Versiones para fondos claros y oscuros + animación sutil de parpadeo.
      </p>

      {/* Logo Variants Grid */}
      <div className={styles.variantsGrid}>
        {logoVariants.map(variant => (
          <div key={variant.id} className={`${styles.variantCard} ${variant.bg === 'dark' ? styles.darkBg : ''}`}>
            <div className={styles.variantPreview}>
              {variant.id === '1-01' || variant.id === '1-04' ? (
                <BlinkingLogo 
                  closedImg={`/${variant.id === '1-01' ? '1-01' : '1-04'}.png`} 
                  openImg={`/${variant.id === '1-01' ? '1-04' : '1-01'}.png`} 
                  size={60} 
                />
              ) : (
                <Image 
                  src={`/${variant.id}.png`} 
                  alt={`Logo ${variant.name}`} 
                  width={60} 
                  height={84} 
                  style={{ width: 'auto', height: 'auto', maxWidth: '100%' }} 
                />
              )}
            </div>
            <div className={styles.variantInfo}>
              <h4 className={styles.variantName}>{variant.name}</h4>
              <p className={styles.variantDesc}>{variant.desc}</p>
              <code className={styles.variantFile}>{variant.id}.png</code>
              <div className={styles.variantTags}>
                <span className={`${styles.tag} ${variant.bg === 'dark' ? styles.tagDark : styles.tagLight}`}>
                  {variant.bg === 'dark' ? 'Fondo Oscuro' : 'Fondo Claro'}
                </span>
                {variant.id === '1-01' || variant.id === '1-04' ? (
                  <span className={styles.tagAnim}>Animado</span>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Animation Demo */}
      <div className={styles.animationDemo} style={{ marginTop: '40px' }}>
        <h3 className={styles.subSectionTitle}>
          <FaEye size={18} style={{ marginRight: '10px', color: '#dc2626' }} />
          Animación de Parpadeo (Ciclo ~3.5s)
        </h3>
        <div className={styles.animationRow}>
          <div className={styles.animationCard}>
            <h4 style={{ color: '#dc2626', marginBottom: '16px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Sobre Fondo Claro
            </h4>
            <div style={{ background: '#f5f5f5', borderRadius: '12px', padding: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '120px' }}>
              <BlinkingLogo closedImg="/1-01.png" openImg="/1-04.png" size={50} />
            </div>
          </div>
          <div className={styles.animationCard}>
            <h4 style={{ color: '#dc2626', marginBottom: '16px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Sobre Fondo Oscuro
            </h4>
            <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '120px' }}>
              <BlinkingLogo closedImg="/1-02.png" openImg="/1-03.png" size={50} />
            </div>
          </div>
        </div>
      </div>

      {/* Usage Guidelines */}
      <div className={styles.guidelinesSection} style={{ marginTop: '40px' }}>
        <h3 className={styles.subSectionTitle}>
          <FaCircleInfo size={18} style={{ marginRight: '10px', color: '#dc2626' }} />
          Guías de Uso y Restricciones
        </h3>
        <div className={styles.guidelinesGrid}>
          {usageGuidelines.map((guideline, i) => (
            <div key={i} className={`${styles.guidelineCard} ${guideline.status === 'ok' ? styles.guidelineOk : guideline.status === 'error' ? styles.guidelineError : styles.guidelineInfo}`}>
              <div className={styles.guidelineIcon} style={{ color: guideline.status === 'ok' ? '#22c55e' : guideline.status === 'error' ? '#ef4444' : '#3b82f6' }}>
                {guideline.icon}
              </div>
              <h4 className={styles.guidelineTitle}>{guideline.title}</h4>
              <p className={styles.guidelineDesc}>{guideline.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Specs */}
      <div className={styles.techSpecs} style={{ marginTop: '40px' }}>
        <h3 className={styles.subSectionTitle}>
          <FaCopy size={18} style={{ marginRight: '10px', color: '#dc2626' }} />
          Especificaciones Técnicas
        </h3>
        <div className={styles.specsGrid}>
          <div className={styles.specCard}>
            <h4>Formatos Disponibles</h4>
            <ul>
              <li>PNG (transparente) - 4 variantes base</li>
              <li>SVG (vectorial) - Para escalado infinito</li>
              <li>WebP - Para web optimizado</li>
            </ul>
          </div>
          <div className={styles.specCard}>
            <h4>Dimensiones Base</h4>
            <ul>
              <li>Aspect Ratio: ~5:7 (retrato)</li>
              <li>Referencia: 500px × 700px</li>
              <li>Área segura: 80% central</li>
            </ul>
          </div>
          <div className={styles.specCard}>
            <h4>Colores del Logo</h4>
            <ul>
              <li>Versión Light: Negro #000000</li>
              <li>Versión Dark: Blanco #FFFFFF</li>
              <li>Sin colores intermedios</li>
            </ul>
          </div>
          <div className={styles.specCard}>
            <h4>Animación CSS</h4>
            <ul>
              <li>Duración: 3.5s ciclo completo</li>
              <li>Easing: ease-in-out</li>
              <li>Keyframes: 0% → 50% → 100%</li>
              <li>Reduced-motion: respeta prefers-reduced-motion</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
