'use client';

import { FaPalette } from 'react-icons/fa6';
import styles from './ColorPalette.module.css';
import sectionStyles from './Section.module.css';

const colors = [
  { name: 'Black', hex: '#000000', var: '--color-black' },
  { name: 'Dark', hex: '#0a0a0a', var: '--color-dark' },
  { name: 'Grey', hex: '#2d2d2d', var: '--color-grey' },
  { name: 'Crimson Red', hex: '#dc2626', var: '--color-accent' },
  { name: 'Grey Light', hex: '#a4a4a4', var: '--color-grey-light' },
  { name: 'White', hex: '#ffffff', var: '--color-white' },
];

export function ColorPalette() {
  return (
    <section className="section">
      <div className="sectionHeader">
        <FaPalette className="sectionIcon" />
        <h2 className="sectionTitle">Paleta Cromática</h2>
      </div>
      
      <div className={styles.colorGrid}>
        {colors.map(color => (
          <div key={color.var} className={styles.colorCard}>
            <div 
              className={styles.colorValue} 
              style={{ background: `var(${color.var})` }}
            />
            <div className={styles.colorInfo}>
              <span className={styles.colorName}>{color.name}</span>
              <span className={styles.hexCode}>{color.hex}</span>
              <code className={styles.varName}>{color.var}</code>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
