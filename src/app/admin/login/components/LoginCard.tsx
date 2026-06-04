import Image from 'next/image';
import Card from '@/components/ui/Card';
import styles from '../login.module.css';

interface LoginCardProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function LoginCard({ children, title, subtitle }: LoginCardProps) {
  return (
    <div className={`${styles.loginContainer} admin-login-page`}>
      <Card className={styles.loginCard}>
        <div className={styles.header}>
          <Image src="/1-01.png" alt="Logo" width={80} height={80} className={styles.logo} />
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        {children}
      </Card>
    </div>
  );
}
