'use client';

import styles from './Input.module.css';

interface YearSelectorProps {
  label: string;
  name: string;
  min?: number;
  defaultValue?: string;
}

export default function YearSelector({ label, name, min = 1900, defaultValue = '' }: YearSelectorProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - min + 1 }, 
    (_, i) => currentYear - i
  );

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>{label}</label>
      <select 
        name={name} 
        className={styles.input}
        defaultValue={defaultValue}
        style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }}
      >
        <option value="" style={{ background: '#000', color: '#fff' }}>-- Seleccionar Año --</option>
        {years.map(year => (
          <option key={year} value={`Desde ${year}`} style={{ background: '#000', color: '#fff' }}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
