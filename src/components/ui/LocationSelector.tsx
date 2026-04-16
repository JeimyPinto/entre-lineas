'use client';

import { useState } from 'react';
import { COMMON_COUNTRIES, COLOMBIA_DATA } from '@/data/locations';
import styles from './Input.module.css';

interface LocationSelectorProps {
  label: string;
  name: string;
  defaultValue?: string;
}

export default function LocationSelector({ label, name, defaultValue = '' }: LocationSelectorProps) {
  const [country, setCountry] = useState<string>(() => {
    if (!defaultValue) return '';
    if (defaultValue.includes('Colombia')) return 'Colombia';
    if (COMMON_COUNTRIES.includes(defaultValue)) return defaultValue;
    return 'Otro';
  });

  const [customCountry, setCustomCountry] = useState<string>(() => {
    if (!defaultValue) return '';
    if (!defaultValue.includes('Colombia') && !COMMON_COUNTRIES.includes(defaultValue)) return defaultValue;
    return '';
  });

  const [department, setDepartment] = useState<string>(() => {
    if (defaultValue && defaultValue.includes('Colombia')) {
      const parts = defaultValue.split(',');
      if (parts.length >= 2) return parts[1].trim();
    }
    return '';
  });

  const [city, setCity] = useState<string>(() => {
    if (defaultValue && defaultValue.includes('Colombia')) {
      const parts = defaultValue.split(',');
      return parts[0].trim();
    }
    return '';
  });

  const finalValue = country === 'Colombia' 
    ? (city && department ? `${city},${department},Colombia` : 'Colombia')
    : country === 'Otro' ? customCountry : country;

  const departmentOptions = Object.keys(COLOMBIA_DATA).sort();
  const cityOptions = department && COLOMBIA_DATA[department] ? COLOMBIA_DATA[department].sort() : [];

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>{label}</label>
      <div style={{ display: 'flex', gap: 'var(--gap-l)', flexWrap: 'wrap' }}>
        <select 
          className={styles.input} 
          style={{ flex: 1, minWidth: '150px', backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }}
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setDepartment('');
            setCity('');
          }}
          required
        >
          <option value="" disabled style={{ background: '#000', color: '#fff' }}>-- Seleccionar País --</option>
          {COMMON_COUNTRIES.map(c => (
            <option key={c} value={c} style={{ background: '#000', color: '#fff' }}>{c}</option>
          ))}
        </select>

        {country === 'Otro' && (
          <input 
            type="text"
            className={styles.input}
            placeholder="Especificar País o Región"
            style={{ flex: 1, minWidth: '150px' }}
            value={customCountry}
            onChange={(e) => setCustomCountry(e.target.value)}
            required
          />
        )}

        {country === 'Colombia' && (
          <>
            <select 
              className={styles.input} 
              style={{ flex: 1, minWidth: '150px', backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }}
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setCity('');
              }}
              required
            >
              <option value="" disabled style={{ background: '#000', color: '#fff' }}>-- Departamento --</option>
              {departmentOptions.map(dep => (
                <option key={dep} value={dep} style={{ background: '#000', color: '#fff' }}>{dep}</option>
              ))}
            </select>

            {department && (
              <select 
                className={styles.input} 
                style={{ flex: 1, minWidth: '150px', backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              >
                <option value="" disabled style={{ background: '#000', color: '#fff' }}>-- Ciudad --</option>
                {cityOptions.map(c => (
                  <option key={c} value={c} style={{ background: '#000', color: '#fff' }}>{c}</option>
                ))}
              </select>
            )}
          </>
        )}
      </div>
      <input type="hidden" name={name} value={finalValue} />
    </div>
  );
}
