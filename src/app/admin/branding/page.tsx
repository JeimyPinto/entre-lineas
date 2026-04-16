import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaArrowLeft, 
  FaPalette, 
  FaFont, 
  FaShapes, 
  FaImage, 
  FaInstagram, 
} from 'react-icons/fa6';
import styles from './branding.module.css';
import BlinkingLogo from '@/components/ui/BlinkingLogo';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import InstagramCard from '@/components/ui/InstagramCard';

export default function BrandingPage() {
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

  const colors = [
    { name: 'Black', hex: '#000000', var: '--color-black' },
    { name: 'Dark', hex: '#0a0a0a', var: '--color-dark' },
    { name: 'Grey', hex: '#2a2a2a', var: '--color-grey' },
    { name: 'Brand Red', hex: '#950303', var: '--color-red' },
    { name: 'Grey Light', hex: '#929090', var: '--color-grey-light' },
    { name: 'White', hex: '#ffffff', var: '--color-white' },
  ];

  return (
    <div className={styles.brandingPage}>
      <div className={styles.banner}>
        <Link href="/" className={styles.backLink}>
          <FaArrowLeft /> Volver a la web
        </Link>
        <h1 className={styles.title}>Identidad Corporativa</h1>
        <p className={styles.subtitle}>SISTEMA DE DISEÑO ENTRE LÍNEAS</p>
      </div>

      <div className={styles.container}>
        {/* Colors Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <FaPalette className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Paleta Cronmática</h2>
          </div>
          <div className={styles.colorGrid}>
            {colors.map(color => (
              <div key={color.var} className={styles.colorCard}>
                <div className={styles.colorValue} style={{ background: `var(${color.var})` }}></div>
                <div className={styles.colorInfo}>
                  <span className={styles.colorName}>{color.name}</span>
                  <span className={styles.hexCode}>{color.hex}</span>
                  <code className={styles.varName}>{color.var}</code>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <FaFont className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Escala Tipográfica (8 Niveles)</h2>
          </div>
          <p className={styles.typoSectionNote}>
            Esta escala está calibrada para la tipografía Cloister: las variables responden a tamaños clásicos de la fuente y ayudan a mantener la jerarquía, el contraste y la legibilidad en cada página.
          </p>
          <div className={styles.typoScaleList}>
            {typoSizes.map(size => (
              <div key={size.name} className={styles.typoScaleItem}>
                <div className={styles.typoScaleMeta}>
                  <span className={styles.sizeName}>{size.name}</span>
                  <span className={styles.sizeValue}>{size.label}</span>
                </div>
                <p className={styles.typoScalePreview} style={{ fontSize: size.var }}>
                  {size.name === 'Display' ? 'Entre Líneas' : 'Cuidamos la forma y el fondo.'}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Logo Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <FaImage className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Simbología del Ojo</h2>
          </div>
          
          <div className={styles.brandingGrid}>
            <div className={styles.logoGroup}>
              <h3 className={styles.groupTitle}>Para Fondos Claros</h3>
              <div className={styles.logoRow}>
                <div className={styles.logoItem}>
                  <div className={styles.logoPreviewLight}>
                    <Image src="/1-01.png" alt="Ojo Negro Semi-cerrado" width={60} height={80} style={{ width: 'auto', height: 'auto' }} />
                  </div>
                  <span>1. Semi-cerrado</span>
                </div>
                <div className={styles.logoItem}>
                  <div className={styles.logoPreviewLight}>
                    <Image src="/1-04.png" alt="Ojo Negro Abierto" width={60} height={80} style={{ width: 'auto', height: 'auto' }} />
                  </div>
                  <span>4. Abierto</span>
                </div>
                <div className={styles.logoItem}>
                  <div className={styles.logoPreviewLight}>
                    <BlinkingLogo closedImg="/1-01.png" openImg="/1-04.png" size={50} />
                  </div>
                  <span style={{ color: 'var(--color-red)' }}>Animación: Parpadeo</span>
                </div>
              </div>
            </div>

            <div className={styles.logoGroup}>
              <h3 className={styles.groupTitle}>Para Fondos Oscuros</h3>
              <div className={styles.logoRow}>
                <div className={styles.logoItem}>
                  <div className={styles.logoPreviewDark}>
                    <Image src="/1-02.png" alt="Ojo Blanco Semi-cerrado" width={60} height={80} style={{ width: 'auto', height: 'auto' }} />
                  </div>
                  <span>2. Semi-cerrado</span>
                </div>
                <div className={styles.logoItem}>
                  <div className={styles.logoPreviewDark}>
                    <Image src="/1-03.png" alt="Ojo Blanco Abierto" width={60} height={80} style={{ width: 'auto', height: 'auto' }} />
                  </div>
                  <span>3. Abierto</span>
                </div>
                <div className={styles.logoItem}>
                  <div className={styles.logoPreviewDark}>
                    <BlinkingLogo closedImg="/1-02.png" openImg="/1-03.png" size={50} />
                  </div>
                  <span style={{ color: 'var(--color-red)' }}>Animación: Parpadeo</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <FaShapes className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Catálogo de Componentes</h2>
          </div>
          
          <div className={styles.uiShowcase}>
            <div className={styles.uiColumn}>
              <span className={styles.uiLabel}>Botones Generales</span>
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
        </section>

        {/* Cards Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <FaShapes className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Tarjetas</h2>
          </div>
          <div className={styles.cardShowcase}>
            <div className={styles.cardPreviewItem}>
              <span className={styles.uiLabel}>Standard Card</span>
              <div style={{ width: '100%', maxWidth: '320px' }}>
                <Card 
                  title="Final Nacional 2023" 
                  subtitle="Manizales, Colombia"
                >
                  <div style={{ padding: '1rem', display: 'flex', justifyContent: 'center' }}>
                    <Image src="/Entre-lineas-logo.png" alt="Logo Entre Líneas" width={150} height={80} style={{ objectFit: 'contain' }} />
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

        {/* Responsive Design Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <FaShapes className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Diseño Responsive</h2>
          </div>
          <p className={styles.responsiveNote}>
            El sistema de diseño es completamente responsive y se adapta a diferentes anchos de pantalla mediante consultas @media. Los breakpoints principales utilizados son:
          </p>
          <ul className={styles.breakpointList}>
            <li><strong>@media (max-width: 1024px):</strong> Cambios para pantallas de tablet grandes y laptops pequeñas.</li>
            <li><strong>@media (max-width: 900px):</strong> Adaptaciones para tablets y móviles grandes (cambio de layout en cards).</li>
            <li><strong>@media (max-width: 768px):</strong> Ajustes para tablets y móviles (menú hamburguesa, layouts compactos).</li>
            <li><strong>@media (max-width: 600px):</strong> Optimizaciones para móviles (fuentes y espaciados reducidos).</li>
            <li><strong>@media (max-width: 480px):</strong> Adaptaciones para pantallas pequeñas (elementos minimalistas).</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
