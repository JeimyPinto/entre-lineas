import { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
}

export default function Card({ children, title, subtitle, icon, className = '' }: CardProps) {
  return (
    <div className={`${styles.card} ${className}`}>
      {(title || subtitle || icon) && (
        <div className={styles.cardHeader}>
          {icon && <span className={styles.cardIcon}>{icon}</span>}
          {title && <h3 className={styles.cardTitle}>{title}</h3>}
          {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
        </div>
      )}
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  );
}
