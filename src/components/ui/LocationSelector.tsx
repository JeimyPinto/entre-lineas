'use client';

import { useState } from 'react';
import { COLOMBIA_CITIES } from '@/data/colombia';
import styles from './Input.module.css';

interface LocationSelectorProps {
  label: string;
  name: string;
  defaultValue?: string;
}

export default function LocationSelector({ label, name, defaultValue = '' }: LocationSelectorProps) {
  const [selected, setSelected] = useState(defaultValue);
  const isOther = selected === 'OTRO / EXTRANJERO';

  const options = [...COLOMBIA_CITIES];
  if (defaultValue && !options.includes(defaultValue) && defaultValue !== 'OTRO / EXTRANJERO') {
    options.unshift(defaultValue);
  }

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>{label}</label>
      <div style={{ display: 'flex', gap: 'var(--gap-l)', flexWrap: 'wrap' }}>
        <select 
          className={styles.input} 
          style={{ flex: 1, minWidth: '200px', backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }}
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          required
        >
          <option value="" style={{ background: '#000', color: '#fff' }}>-- Seleccionar Ciudad --</option>
          {options.map(city => (
            <option key={city} value={city} style={{ background: '#000', color: '#fff' }}>{city}</option>
          ))}
        </select>

        {isOther && (
          <input 
            type="text"
            className={styles.input}
            placeholder="Especifique Ciudad/País"
            style={{ flex: 1, minWidth: '200px' }}
            name={name}
            required
          />
        )}
      </div>
      {!isOther && <input type="hidden" name={name} value={selected} />}
    </div>
  );
}
