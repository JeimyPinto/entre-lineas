'use client';

import { ColorPalette, Typography, LogoShowcase, ComponentsShowcase } from './components';
import styles from './branding.module.css';

export default function BrandingPage() {
  return (
    <main className={styles.main}>
      <ColorPalette />
      <Typography />
      <LogoShowcase />
      <ComponentsShowcase />
    </main>
  );
}
