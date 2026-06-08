'use client';

import { useState, useRef } from 'react';
import styles from './ImageUploader.module.css';
import { FaCloudArrowUp, FaTrashCan, FaArrowsUpDown } from 'react-icons/fa6';
import Image from 'next/image';
import Button from '@/shared/ui/Button/Button';

interface ImageUploaderProps {
  label: string;
  name: string;
  defaultImage?: string;
  defaultPosition?: string;
}

export default function ImageUploader({ label, name, defaultImage, defaultPosition }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const initialPos = defaultPosition ? parseInt(defaultPosition.replace('%', '')) : 50;
  const [position, setPosition] = useState(initialPos);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setPosition(50);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      
      <div 
        className={`${styles.dropZone} ${preview ? styles.hasPreview : ''}`}
        onClick={() => !preview && fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          name={name} 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className={styles.hiddenInput}
        />

        {preview ? (
          <div className={styles.previewContainer}>
            <img 
              src={preview} 
              alt="Preview" 
              className={styles.previewImage} 
              style={{ objectPosition: `center ${position}%` }}
            />
            <div className={styles.overlay}>
              <Button type="button" onClick={removeImage} variant="danger">
                <FaTrashCan /> Cambiar Imagen
              </Button>
            </div>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <FaCloudArrowUp size={40} className={styles.icon} />
            <p className={styles.text}>Haz clic o arrastra una imagen</p>
            <span className={styles.subtext}>JPG, PNG o WEBP (Máx. 5MB)</span>
          </div>
        )}
      </div>

      {preview && (
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
          <input type="hidden" name="imagePosition" value={`${position}%`} />
        </div>
      )}
      
      {/* Mantenemos la URL actual si no se sube nada nuevo */}
      <input type="hidden" name="currentImage" value={defaultImage || ''} />
    </div>
  );
}
