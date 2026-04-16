'use client';

import { useState, useEffect } from 'react';
import styles from './TagSelector.module.css';

interface TagSelectorProps {
  label: string;
  options: string[];
  name: string;
  required?: boolean;
  defaultValue?: string[];
}

export default function TagSelector({ label, options, name, required, defaultValue = [] }: TagSelectorProps) {
  const [selected, setSelected] = useState<string[]>(defaultValue);

  const toggleTag = (option: string) => {
    setSelected(prev => 
      prev.includes(option) 
        ? prev.filter(t => t !== option) 
        : [...prev, option]
    );
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <div className={styles.tagsGrid}>
        {options.map(option => (
          <button
            key={option}
            type="button"
            className={`${styles.tag} ${selected.includes(option) ? styles.active : ''}`}
            onClick={() => toggleTag(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <input type="hidden" name={name} value={selected.join(',')} required={required && selected.length === 0} />
      {required && selected.length === 0 && (
        <span className={styles.errorText}>* Debes seleccionar al menos un rol</span>
      )}
    </div>
  );
}
