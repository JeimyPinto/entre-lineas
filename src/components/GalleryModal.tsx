"use client";
import { ReactNode } from "react";
import '@/styles/gallery.css';

interface GalleryModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function GalleryModal({ open, onClose, children }: GalleryModalProps) {
  if (!open) return null;
  return (
    <div className="gallery-modal" onClick={onClose}>
      <div
        className="gallery-modal-content gallery-modal-content--large"
        onClick={e => e.stopPropagation()}
      >
        <button className="btn" style={{ alignSelf: 'flex-end', marginBottom: '1rem' }} onClick={onClose} aria-label="Cerrar modal">
          Cerrar
        </button>
        {children}
      </div>
    </div>
  );
}
