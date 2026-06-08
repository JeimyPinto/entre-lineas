'use client';

import { useState, useEffect, useCallback } from 'react';
import { FaXmark, FaFloppyDisk, FaSpinner } from 'react-icons/fa6';
import styles from './AdminForm.module.css';
import { ColumnConfig } from '../types';
import Input from '@/shared/ui/Input/Input';
import Textarea from '@/shared/ui/Textarea/Textarea';
import Select from '@/shared/ui/Select/Select';
import Checkbox from '@/shared/ui/Checkbox/Checkbox';
import ImageUpload from '@/shared/ui/ImageUpload/ImageUpload';

export interface AdminFormProps {
  config: ColumnConfig[];
  initialData?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
  title?: string;
  loading?: boolean;
}

export default function AdminForm({
  config,
  initialData = {},
  onSubmit,
  onCancel,
  submitLabel = 'Guardar',
  title = 'Formulario',
  loading = false,
}: AdminFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Inicializar formData con initialData
  useEffect(() => {
    const data: Record<string, any> = {};
    config.forEach(col => {
      if (col.visibleInForm !== false) {
        data[col.name] = initialData[col.name] ?? col.type === 'boolean' ? false : '';
      }
    });
    setFormData(data);
    setErrors({});
  }, [initialData, config]);

  const handleChange = useCallback((name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error al cambiar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    
    config.forEach(col => {
      if (col.visibleInForm === false || col.readOnly) return;
      
      const value = formData[col.name];
      
      // Validación required
      if (col.required && (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0))) {
        newErrors[col.name] = `${col.label} es obligatorio`;
        return;
      }
      
      // Validación personalizada
      if (col.validate && value !== undefined && value !== null && value !== '') {
        const error = col.validate(value);
        if (error) {
          newErrors[col.name] = error;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [config, formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (col: ColumnConfig) => {
    const value = formData[col.name];
    const error = errors[col.name];
    const disabled = col.readOnly || loading || submitting;

    const commonProps = {
      label: col.label,
      name: col.name,
      value,
      onChange: (v: any) => handleChange(col.name, v),
      error,
      disabled,
      placeholder: col.placeholder,
      helpText: col.helpText,
      required: col.required,
    };

    switch (col.type) {
      case 'textarea':
        return <Textarea {...commonProps} rows={4} />;
      
      case 'select':
        return (
          <Select
            {...commonProps}
            options={col.options || []}
          />
        );
      
      case 'multiselect':
        return (
          <Select
            {...commonProps}
            options={col.options || []}
            multiple
          />
        );
      
      case 'boolean':
        return <Checkbox {...commonProps} checked={value} onChange={(checked: boolean) => handleChange(col.name, checked)} />;
      
      case 'image':
        return <ImageUpload {...commonProps} onChange={(url: string) => handleChange(col.name, url)} />;
      
      case 'number':
        return <Input {...commonProps} type="number" step="any" />;
      
      case 'date':
        return <Input {...commonProps} type="date" />;
      
      case 'datetime':
        return <Input {...commonProps} type="datetime-local" />;
      
      case 'email':
        return <Input {...commonProps} type="email" />;
      
      case 'url':
        return <Input {...commonProps} type="url" />;
      
      case 'json':
        return (
          <Textarea
            {...commonProps}
            rows={6}
            placeholder={col.placeholder || 'JSON válido'}
            value={typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              const v = e.target.value;
              try {
                handleChange(col.name, JSON.parse(v));
              } catch {
                handleChange(col.name, v);
              }
            }}
          />
        );
      
      default:
        return <Input {...commonProps} />;
    }
  };

  const formFields = config.filter(col => col.visibleInForm !== false);

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modal} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="form-title">
        <header className={styles.header}>
          <h2 id="form-title" className={styles.title}>{title}</h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onCancel}
            disabled={submitting}
            aria-label="Cerrar"
          >
            <FaXmark size={20} />
          </button>
        </header>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fields}>
            {formFields.map(col => (
              <div key={col.name} className={styles.fieldWrapper}>
                {renderField(col)}
              </div>
            ))}
          </div>
          
          <footer className={styles.footer}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onCancel}
              disabled={submitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={submitting || loading}
            >
              {submitting ? (
                <>
                  <FaSpinner className={styles.spinner} />
                  Guardando…
                </>
              ) : (
                <>
                  <FaFloppyDisk />
                  {submitLabel}
                </>
              )}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}