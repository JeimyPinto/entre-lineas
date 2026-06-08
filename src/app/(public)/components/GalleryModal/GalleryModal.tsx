"use client";

import { useEffect, useState, ReactNode } from "react";
import styles from "./GalleryModal.module.css";

interface GalleryModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function GalleryModal({ open, onClose, children }: GalleryModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle ESC key to close modal
  useEffect(() => {
    if (!open) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll when modal is open
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
    if (isClosing) return;
    setIsClosing(true);
    // Wait for animation to complete before calling onClose
    const timer = setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200); // Match the animation duration
    return () => clearTimeout(timer);
  };

  if (!open && !isMounted) return null;
  
  const overlayClasses = `${styles.modalOverlay} ${isClosing ? styles.closing : ''}`;
  const contentClasses = `${styles.modalContent} ${styles.modalContentLarge} ${isClosing ? styles.closing : ''}`;
  
  return (
    <div className={overlayClasses} onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div
        className={contentClasses}
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={handleClose} aria-label="Cerrar modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
