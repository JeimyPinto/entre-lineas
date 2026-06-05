'use client';

import { FaFont } from 'react-icons/fa6';
import styles from './Typography.module.css';
import sectionStyles from './Section.module.css';

const typoSizes = [
  { name: 'Display', var: 'var(--font-display)', label: 'Títulos de Impacto / Hero' },
  { name: 'H1', var: 'var(--font-h1)', label: 'Encabezados de Sección' },
  { name: 'H2', var: 'var(--font-h2)', label: 'Sub-encabezados' },
  { name: 'H3', var: 'var(--font-h3)', label: 'Títulos de Artículos/Cards' },
  { name: 'H4', var: 'var(--font-h4)', label: 'Navegación / Overlays' },
  { name: 'Body Large', var: 'var(--font-body-lg)', label: 'Introducciones' },
  { name: 'Body', var: 'var(--font-body)', label: 'Texto de Párrafo General' },
  { name: 'Small', var: 'var(--font-small)', label: 'Metadatos / Notas' },
];

export function Typography() {
  return (
    <section className="section">
      <div className="sectionHeader">
        <FaFont className="sectionIcon" />
        <h2 className="sectionTitle">Escala Tipográfica (8 Niveles)</h2>
      </div>
      
      <p style={{ color: '#a4a4a4', marginBottom: '24px', lineHeight: 1.7 }}>
        Esta escala está calibrada para la tipografía Cloister: las variables responden a tamaños 
        clásicos de la fuente y ayudan a mantener la jerarquía, el contraste y la legibilidad.
      </p>
      
      <div className={styles.typoScaleList}>
        {typoSizes.map(size => (
          <div key={size.name} className={styles.typoScaleItem}>
            <div className={styles.typoScaleMeta}>
              <span className={styles.sizeName}>{size.name}</span>
              <span className={styles.sizeValue}>{size.label}</span>
            </div>
            <p 
              className={styles.typoScalePreview} 
              style={{ fontSize: size.var }}
            >
              {size.name === 'Display' ? 'Entre Líneas' : 'Cuidamos la forma y el fondo.'}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
