"use client";

import styles from "./GalleryModal.module.css";
import { ReactNode } from "react";

interface GalleryModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function GalleryModal({ open, onClose, children }: GalleryModalProps) {
  if (!open) return null;
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={`${styles.modalContent} ${styles.modalContentLarge}`}
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar modal">
          Cerrar
        </button>
        {children}
      </div>
    </div>
  );
}
