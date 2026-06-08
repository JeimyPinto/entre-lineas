'use client';

import { useState, useRef } from 'react';
import styles from './ImageUpload.module.css';
import { FaCloudArrowUp, FaTrashCan, FaArrowsUpDown } from 'react-icons/fa6';

interface ImageUploadProps {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  helpText?: string;
  required?: boolean;
}

export default function ImageUpload({ 
  label, 
  value, 
  onChange, 
  error, 
  disabled = false,
  helpText,
  required = false,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [position, setPosition] = useState(50);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setPosition(50);
    onChange('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`${styles.wrapper} ${error ? styles.hasError : ''}`}>
      {label && <label className={styles.label}>{label} {required && <span className={styles.required}>*</span>}</label>}
      
      <div 
        className={`${styles.dropZone} ${preview ? styles.hasPreview : ''}`}
        onClick={() => !preview && !disabled && fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className={styles.hiddenInput}
          disabled={disabled}
        />

        {preview ? (
          <div className={styles.previewContainer}>
            <img 
              src={preview} 
              alt="Preview" 
              className={styles.previewImage} 
              style={{ objectPosition: `center ${position}%` }}
            />
            {!disabled && (
              <div className={styles.overlay}>
                <button 
                  type="button" 
                  className={styles.removeBtn}
                  onClick={(e) => { e.stopPropagation(); removeImage(); }}
                >
                  <FaTrashCan size={14} /> Cambiar
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.placeholder}>
            <FaCloudArrowUp size={40} className={styles.icon} />
            <p className={styles.text}>{disabled ? 'Imagen actual' : 'Haz clic o arrastra una imagen'}</p>
            <span className={styles.subtext}>JPG, PNG o WEBP (Máx. 5MB)</span>
          </div>
        )}
      </div>

      {preview && !disabled && (
        <div className={styles.positionControl}>
          <div className={styles.positionHeader}>
            <FaArrowsUpDown size={14} />
            <span>Ajuste Vertical (Encuadre)</span>
            <span className={styles.posValue}>{position}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={position} 
            onChange={(e) => setPosition(parseInt(e.target.value))}
            className={styles.slider}
          />
        </div>
      )}
      
      {error && <span className={styles.errorText}>{error}</span>}
      {helpText && !error && <span className={styles.helpText}>{helpText}</span>}
    </div>
  );
}