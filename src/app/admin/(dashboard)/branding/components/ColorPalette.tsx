'use client';

import { FaPalette, FaCircle } from 'react-icons/fa6';
import styles from './ColorPalette.module.css';
import sectionStyles from './Section.module.css';

const colorGroups = [
  {
    group: 'Fondos',
    colors: [
      { name: 'Primary', hex: '#0a0a0a', var: '--color-bg-primary', desc: 'Fondo principal' },
      { name: 'Secondary', hex: '#0f0f0f', var: '--color-bg-secondary', desc: 'Fondo secundario' },
      { name: 'Surface', hex: '#141414', var: '--color-bg-surface', desc: 'Superficies elevadas' },
      { name: 'Elevated', hex: '#1a1a1a', var: '--color-bg-elevated', desc: 'Elementos flotantes' },
    ]
  },
  {
    group: 'Neutros',
    colors: [
      { name: 'Black', hex: '#000000', var: '--color-black', desc: 'Negro absoluto' },
      { name: 'Dark', hex: '#0f0f0f', var: '--color-dark', desc: 'Casi negro' },
      { name: 'Grey Dark', hex: '#1e1e1e', var: '--color-grey-dark', desc: 'Gris muy oscuro' },
      { name: 'Grey', hex: '#2d2d2d', var: '--color-grey', desc: 'Gris medio' },
      { name: 'Grey Light', hex: '#a4a4a4', var: '--color-grey-light', desc: 'Gris claro / Texto muted' },
      { name: 'White', hex: '#ffffff', var: '--color-white', desc: 'Blanco puro' },
    ]
  },
  {
    group: 'Acento (Crimson)',
    colors: [
      { name: 'Accent', hex: '#dc2626', var: '--color-accent', desc: 'Rojo principal' },
      { name: 'Accent Hover', hex: '#ef4444', var: '--color-accent-hover', desc: 'Hover estado' },
      { name: 'Accent Subtle', hex: '#7f1d1d', var: '--color-accent-subtle', desc: 'Fondos sutiles' },
      { name: 'Accent Glow', hex: 'rgba(220,38,38,0.4)', var: '--color-accent-glow', desc: 'Glow suave' },
      { name: 'Accent Glow Intense', hex: 'rgba(220,38,38,0.6)', var: '--color-accent-glow-intense', desc: 'Glow intenso' },
    ]
  },
  {
    group: 'Bordes & Glassmorphism',
    colors: [
      { name: 'Border Subtle', hex: 'rgba(255,255,255,0.06)', var: '--color-border-subtle', desc: 'Bordes muy sutiles' },
      { name: 'Border', hex: 'rgba(255,255,255,0.08)', var: '--color-border', desc: 'Borde estándar' },
      { name: 'Border Light', hex: 'rgba(255,255,255,0.12)', var: '--color-border-light', desc: 'Borde visible' },
      { name: 'Border Hover', hex: 'rgba(255,255,255,0.2)', var: '--color-border-hover', desc: 'Borde hover' },
      { name: 'Glass Thin', hex: 'rgba(255,255,255,0.025)', var: '--bg-glass-thin', desc: 'Glassmorphism fino' },
      { name: 'Glass Medium', hex: 'rgba(255,255,255,0.04)', var: '--bg-glass-medium', desc: 'Glassmorphism medio' },
      { name: 'Glass Thick', hex: 'rgba(255,255,255,0.08)', var: '--bg-glass-thick', desc: 'Glassmorphism grueso' },
      { name: 'Glass Hover', hex: 'rgba(255,255,255,0.12)', var: '--bg-glass-hover', desc: 'Glassmorphism hover' },
    ]
  },
  {
    group: 'Sistema de Tarjetas',
    colors: [
      { name: 'Card Base', hex: 'rgba(255,255,255,0.025)', var: '--bg-card', desc: 'Tarjeta base' },
      { name: 'Card Hover', hex: 'rgba(255,255,255,0.05)', var: '--bg-card-hover', desc: 'Tarjeta hover' },
      { name: 'Card Active', hex: 'rgba(255,255,255,0.08)', var: '--bg-card-active', desc: 'Tarjeta activa' },
    ]
  },
  {
    group: 'Sistema de Formularios',
    colors: [
      { name: 'Input BG', hex: 'rgba(255,255,255,0.025)', var: '--input-bg', desc: 'Fondo inputs' },
      { name: 'Input Border', hex: 'rgba(255,255,255,0.08)', var: '--input-border', desc: 'Borde inputs' },
      { name: 'Input Border Focus', hex: '#dc2626', var: '--input-border-focus', desc: 'Borde focus' },
      { name: 'Input Text', hex: '#ffffff', var: '--input-text', desc: 'Texto inputs' },
      { name: 'Input Placeholder', hex: 'rgba(255,255,255,0.35)', var: '--input-placeholder', desc: 'Placeholder' },
      { name: 'Label Text', hex: '#a3a3a3', var: '--label-text', desc: 'Texto labels' },
    ]
  },
  {
    group: 'Texto',
    colors: [
      { name: 'Text Primary', hex: '#ffffff', var: '--color-text-primary', desc: 'Texto principal' },
      { name: 'Text Secondary', hex: '#e5e5e5', var: '--color-text-secondary', desc: 'Texto secundario' },
      { name: 'Text Muted', hex: '#a3a3a3', var: '--color-text-muted', desc: 'Texto muted' },
      { name: 'Text Subtle', hex: '#525252', var: '--color-text-subtle', desc: 'Texto muy sutil' },
    ]
  },
  {
    group: 'Sombras',
    colors: [
      { name: 'Shadow', hex: 'rgba(0,0,0,0.5)', var: '--color-shadow', desc: 'Sombra principal' },
      { name: 'Shadow Soft', hex: 'rgba(0,0,0,0.3)', var: '--color-shadow-soft', desc: 'Sombra suave' },
      { name: 'Shadow Accent', hex: 'rgba(220,38,38,0.15)', var: '--color-shadow-accent', desc: 'Sombra acento' },
    ]
  },
];

export function ColorPalette() {
  return (
    <section className="section">
      <div className="sectionHeader">
        <FaPalette className="sectionIcon" />
        <h2 className="sectionTitle">Paleta Cromática - Design Tokens v2.0</h2>
      </div>
      
      <p style={{ color: '#a4a4a4', marginBottom: '32px', lineHeight: 1.7, maxWidth: '800px' }}>
        Sistema de colores Crimson Night. Todas las variables usan <code style={{ color: '#dc2626' }}>CSS Custom Properties</code> 
        para theming dinámico y consistencia total. La paleta está optimizada para modo oscuro con acento carmesí.
      </p>

      {colorGroups.map((group, groupIndex) => (
        <div key={group.group} className={styles.colorGroup}>
          <h3 className={styles.groupTitle}>
            <FaCircle size={10} style={{ color: '#dc2626', marginRight: '12px', verticalAlign: 'middle' }} />
            {group.group}
          </h3>
          <div className={styles.colorGrid}>
            {group.colors.map(color => (
              <div key={color.var} className={styles.colorCard}>
                <div 
                  className={styles.colorValue} 
                  style={{ background: color.var.startsWith('rgba') ? color.var : `var(${color.var})` }}
                />
                <div className={styles.colorInfo}>
                  <span className={styles.colorName}>{color.name}</span>
                  <span className={styles.hexCode}>{color.hex}</span>
                  <code className={styles.varName}>{color.var}</code>
                  <span className={styles.colorDesc}>{color.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
