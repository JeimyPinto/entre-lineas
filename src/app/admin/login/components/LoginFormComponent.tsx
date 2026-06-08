import Button from '@/shared/ui/Button/Button';
import Input from '@/shared/ui/Input/Input';
import Link from 'next/link';
import styles from '../login.module.css';

interface LoginFormComponentProps {
  error: string | null;
  loading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export function LoginFormComponent({ error, loading, onSubmit }: LoginFormComponentProps) {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <Input
          label="Correo Electrónico"
          type="email"
          name="email"
          placeholder="admin@entrelineas.com"
          required
          className={styles.input}
        />
      </div>
      
      <div className={styles.inputGroup}>
        <Input
          label="Contraseña"
          type="password"
          name="password"
          placeholder="••••••••"
          required
          className={styles.input}
        />
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}
      
      <Button 
        type="submit" 
        variant="primary" 
        fullWidth 
        size="large"
        disabled={loading}
      >
        {loading ? 'Iniciando sesión...' : 'Entrar al Panel'}
      </Button>

      <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
        <Link 
          href="/admin/login?reset=request" 
          style={{ 
            color: 'var(--color-text-muted)', 
            fontSize: '0.75rem', 
            textDecoration: 'none',
            borderBottom: '1px solid var(--color-border-light)',
            paddingBottom: '2px',
            transition: 'all var(--transition-base)'
          }}
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
    </form>
  );
}
