"use client";

import { useEffect, useState } from "react";
import styles from "./DeleteConfirmModal.module.css";

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDeleting?: boolean;
}

export default function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Eliminar",
  cancelText = "Cancelar",
  isDeleting = false,
}: DeleteConfirmModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setIsMounted(true);
      setIsClosing(false);
    }
  }, [open]);

  const handleClose = () => {
    if (isClosing || isDeleting) return;
    setIsClosing(true);
    const timer = setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
    return () => clearTimeout(timer);
  };

  const handleConfirm = async () => {
    if (isDeleting) return;
    await onConfirm();
  };

  if (!open && !isMounted) return null;

  const overlayClasses = `${styles.modalOverlay} ${isClosing ? styles.closing : ""}`;
  const contentClasses = `${styles.modalContent} ${isClosing ? styles.closing : ""}`;

  return (
    <div className={overlayClasses} onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
      <div className={contentClasses} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 id="delete-modal-title" className={styles.modalTitle}>{title}</h2>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Cerrar"
            disabled={isDeleting}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className={styles.modalBody}>
          <p className={styles.modalMessage}>{message}</p>
        </div>

        <div className={styles.modalActions}>
          <button
            className={`${styles.btn} ${styles.btnCancel}`}
            onClick={handleClose}
            disabled={isDeleting}
          >
            {cancelText}
          </button>
          <button
            className={`${styles.btn} ${styles.btnConfirm}`}
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Eliminando..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}