import Image from 'next/image';
import Card from '@/shared/ui/Card/Card';
import styles from '../login.module.css';

interface LoginCardProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function LoginCard({ children, title, subtitle }: LoginCardProps) {
  return (
    <div className={styles.cardWrapper}>
      <Card className={styles.loginCard} minimal>
        <div className={styles.header}>
          <div className={styles.logoWrapper}>
            <Image 
              src="/1-01.png" 
              alt="Entre Líneas Logo" 
              width={48} 
              height={48} 
              className={styles.logo}
              priority
            />
          </div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className={styles.form}>
          {children}
        </div>
      </Card>
    </div>
  );
}