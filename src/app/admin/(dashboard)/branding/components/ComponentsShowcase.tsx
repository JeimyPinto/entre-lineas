'use client';

import { useState } from 'react';
import { FaShapes, FaInstagram, FaFont, FaImage, FaPalette, FaLayerGroup, FaCheck, FaExpand } from 'react-icons/fa6';
import Image from 'next/image';
import styles from './ComponentsShowcase.module.css';
import sectionStyles from './Section.module.css';
import Button from '@/shared/ui/Button/Button';
import Card from '@/shared/ui/Card/Card';
import InstagramCard from '@/shared/ui/InstagramCard/InstagramCard';
import Select from '@/shared/ui/Select/Select';
import Textarea from '@/shared/ui/Textarea/Textarea';
import Checkbox from '@/shared/ui/Checkbox/Checkbox';
import ImageUpload from '@/shared/ui/ImageUpload/ImageUpload';
import Input from '@/shared/ui/Input/Input';

export function ComponentsShowcase() {
  const [demoSelect, setDemoSelect] = useState('');
  const [demoMultiSelect, setDemoMultiSelect] = useState<string[]>([]);
  const [demoTextarea, setDemoTextarea] = useState('');
  const [demoCheckbox, setDemoCheckbox] = useState(false);
  const [demoImage, setDemoImage] = useState('');
  const [demoInput, setDemoInput] = useState('');

  const countryOptions = [
    { value: 'co', label: 'Colombia' },
    { value: 'mx', label: 'México' },
    { value: 'ar', label: 'Argentina' },
    { value: 'es', label: 'España' },
    { value: 'cl', label: 'Chile' },
  ];

  const roleOptions = [
    { value: 'founder', label: 'Fundador' },
    { value: 'judge', label: 'Juez' },
    { value: 'host', label: 'Host' },
    { value: 'artist', label: 'Artista' },
    { value: 'organizer', label: 'Organizador' },
  ];

  return (
    <section className="section">
      <div className="sectionHeader">
        <FaShapes className="sectionIcon" />
        <h2 className="sectionTitle">Catálogo de Componentes UI</h2>
      </div>

      <p style={{ color: '#a4a4a4', marginBottom: '32px', lineHeight: 1.7, maxWidth: '800px' }}>
        Sistema de diseño modular basado en CSS Modules. Todos los componentes son accesibles, 
        responsivos y siguen la estética dark/glassmorphism de Entre Líneas.
      </p>

      {/* Botones */}
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
            <Button variant="primary" disabled>Deshabilitado</Button>
          </div>
        </div>

        <div className={styles.uiColumn}>
          <span className={styles.uiLabel}>Input</span>
          <div className={styles.uiContent} style={{ width: '100%', maxWidth: '320px' }}>
            <Input
              label="Nombre de usuario"
              placeholder="ej. freestyler_2024"
              value={demoInput}
              onChange={(e) => setDemoInput(e.target.value)}
            />
            <span style={{ fontSize: '0.7rem', color: '#888' }}>Mínimo 3 caracteres</span>
          </div>
        </div>
      </div>

      {/* Selects */}
      <div className={styles.uiShowcase} style={{ marginTop: '24px' }}>
        <div className={styles.uiColumn}>
          <span className={styles.uiLabel}>Select Simple</span>
          <div className={styles.uiContent} style={{ width: '100%', maxWidth: '320px' }}>
            <Select
              label="País"
              placeholder="Selecciona un país"
              options={countryOptions}
              value={demoSelect}
              onChange={(e) => setDemoSelect(e.target.value)}
              helpText="País de origen del artista"
            />
          </div>
        </div>

        <div className={styles.uiColumn}>
          <span className={styles.uiLabel}>Select Múltiple</span>
          <div className={styles.uiContent} style={{ width: '100%', maxWidth: '320px' }}>
            <Select
              label="Roles en la organización"
              placeholder="Selecciona roles"
              options={roleOptions}
              multiple
              value={demoMultiSelect}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
                setDemoMultiSelect(selected);
              }}
              helpText="Mantén Ctrl/Cmd para seleccionar múltiples"
            />
          </div>
        </div>
      </div>

      {/* Textarea & Checkbox */}
      <div className={styles.uiShowcase} style={{ marginTop: '24px' }}>
        <div className={styles.uiColumn}>
          <span className={styles.uiLabel}>Textarea</span>
          <div className={styles.uiContent} style={{ width: '100%', maxWidth: '400px' }}>
            <Textarea
              label="Biografía"
              placeholder="Cuéntanos tu historia en la escena..."
              value={demoTextarea}
              onChange={(e) => setDemoTextarea(e.target.value)}
              rows={4}
              helpText="Máximo 500 caracteres"
            />
          </div>
        </div>

        <div className={styles.uiColumn} style={{ alignItems: 'flex-start' }}>
          <span className={styles.uiLabel}>Checkbox</span>
          <div className={styles.uiContent} style={{ width: '100%', maxWidth: '400px', alignItems: 'flex-start' }}>
            <Checkbox
              label="Acepto los términos y condiciones"
              checked={demoCheckbox}
              onChange={setDemoCheckbox}
              helpText="Requerido para continuar"
            />
            <Checkbox
              label="Recibir notificaciones por email"
              checked={false}
              onChange={() => {}}
              disabled
            />
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div className={styles.uiShowcase} style={{ marginTop: '24px' }}>
        <div className={styles.uiColumn} style={{ maxWidth: '400px' }}>
          <span className={styles.uiLabel}>Image Upload con Encuadre</span>
          <div className={styles.uiContent} style={{ width: '100%' }}>
            <ImageUpload
              label="Foto de perfil"
              value={demoImage}
              onChange={setDemoImage}
              helpText="JPG, PNG o WEBP. Máx 5MB. Se convierte a WebP 640x800"
            />
          </div>
        </div>
      </div>

      {/* Cards Showcase */}
      <div className={styles.cardShowcase} style={{ marginTop: '40px' }}>
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

      {/* Component Inventory Table */}
      <div style={{ marginTop: '48px' }}>
        <h3 style={{ 
          fontFamily: 'var(--font-title)', 
          fontSize: 'var(--font-h3)', 
          textTransform: 'uppercase', 
          letterSpacing: '2px',
          color: '#dc2626',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <FaLayerGroup size={20} /> Inventario de Componentes del Design System
        </h3>
        
        <div className={styles.inventoryTable}>
          <div className={styles.inventoryHeader}>
            <span>Componente</span>
            <span>Categoría</span>
            <span>Estado</span>
            <span>Descripción</span>
          </div>
          {[
            { name: 'Button', category: 'Formulario', status: '✅ Listo', desc: '5 variantes (primary, secondary, outline, ghost, social)' },
            { name: 'Input', category: 'Formulario', status: '✅ Listo', desc: 'Input de texto con label, error, helpText' },
            { name: 'Textarea', category: 'Formulario', status: '✅ Listo', desc: 'Área de texto multilínea redimensionable' },
            { name: 'Select', category: 'Formulario', status: '✅ Listo', desc: 'Select simple y múltiple con opciones dinámicas' },
            { name: 'Checkbox', category: 'Formulario', status: '✅ Listo', desc: 'Checkbox accesible con animación custom' },
            { name: 'ImageUpload', category: 'Media', status: '✅ Listo', desc: 'Subida de imagen con preview y ajuste vertical' },
            { name: 'Card', category: 'Layout', status: '✅ Listo', desc: 'Card base con title, subtitle, children' },
            { name: 'InstagramCard', category: 'Layout', status: '✅ Listo', desc: 'Card especializada para eventos de Instagram' },
            { name: 'BlinkingLogo', category: 'Branding', status: '✅ Listo', desc: 'Logo animado (ojo parpadeante)' },
            { name: 'TagSelector', category: 'Formulario', status: '✅ Listo', desc: 'Selector de tags con autocompletado' },
            { name: 'YearSelector', category: 'Formulario', status: '✅ Listo', desc: 'Selector de año para eventos' },
            { name: 'LocationSelector', category: 'Formulario', status: '✅ Listo', desc: 'Selector jerárquico País → Depto → Ciudad' },
          ].map((comp, i) => (
            <div key={comp.name} className={`${styles.inventoryRow} ${i % 2 === 0 ? styles.even : styles.odd}`}>
              <span className={styles.compName}><code>{comp.name}</code></span>
              <span className={styles.compCategory}>{comp.category}</span>
              <span className={styles.compStatus}>{comp.status}</span>
              <span className={styles.compDesc}>{comp.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
