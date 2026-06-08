'use client';

import { useEffect, useRef } from 'react';
import { FaXmark, FaTrashCan, FaExclamation } from 'react-icons/fa6';
import styles from './ConfirmModal.module.css';

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'danger',
  loading = false,
}: ConfirmModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      // Focus the cancel button by default (safer)
      setTimeout(() => {
        const cancelBtn = modalRef.current?.querySelector<HTMLButtonElement>('[data-cancel]');
        cancelBtn?.focus();
      }, 0);
      
      // Trap focus
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (!focusableElements || focusableElements.length === 0) return;
          
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const variantStyles = {
    danger: { icon: <FaTrashCan size={24} />, iconClass: styles.iconDanger, borderClass: styles.borderDanger },
    warning: { icon: <FaExclamation size={24} />, iconClass: styles.iconWarning, borderClass: styles.borderWarning },
    info: { icon: <FaExclamation size={24} />, iconClass: styles.iconInfo, borderClass: styles.borderInfo },
  };

  const { icon, iconClass, borderClass } = variantStyles[variant];

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        ref={modalRef}
        className={`${styles.modal} ${borderClass}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
      >
        <header className={styles.header}>
          <div className={`${styles.iconWrapper} ${iconClass}`} aria-hidden="true">
            {icon}
          </div>
          <h2 id="confirm-title" className={styles.title}>{title}</h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            disabled={loading}
            aria-label="Cerrar"
          >
            <FaXmark size={18} />
          </button>
        </header>
        
        <div className={styles.content}>
          <p id="confirm-message" className={styles.message}>{message}</p>
        </div>
        
        <footer className={styles.footer}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onClose}
            disabled={loading}
            data-cancel
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`${styles.confirmBtn} ${variant === 'danger' ? styles.confirmDanger : variant === 'warning' ? styles.confirmWarning : styles.confirmInfo}`}
            onClick={onConfirm}
            disabled={loading}
            data-confirm
          >
            {loading ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                Procesando…
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </footer>
      </div>
    </div>
  );
}