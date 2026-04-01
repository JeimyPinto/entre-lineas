"use client";

import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Card.module.css";

type AspectRatio = 'video' | 'square' | 'portrait';

interface CardProps {
  image: string;
  title: string;
  subtitle?: string;
  aspectRatio?: AspectRatio;
  onClick?: () => void;
  href?: string;
  className?: string;
  isExternal?: boolean;
}

export default function Card({ 
  image, 
  title, 
  subtitle, 
  aspectRatio = 'video', 
  onClick, 
  href, 
  className = '', 
  isExternal = false 
}: CardProps) {
  
  const cardClasses = `${styles.card} ${className}`;
  
  const renderContent = () => (
    <>
      <div className={`${styles.imageWrapper} ${styles[aspectRatio]}`}>
        <Image 
          src={image} 
          alt={title} 
          fill 
          className={styles.image} 
          unoptimized={image.includes('ytimg.com')} // Optimization for YouTube thumbs
        />
        <div className={styles.overlay} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </>
  );

  if (href) {
    if (isExternal || href.startsWith('http')) {
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={cardClasses}
        >
          {renderContent()}
        </a>
      );
    }
    return (
      <Link href={href} className={cardClasses}>
        {renderContent()}
      </Link>
    );
  }

  return (
    <div className={cardClasses} onClick={onClick}>
      {renderContent()}
    </div>
  );
}
