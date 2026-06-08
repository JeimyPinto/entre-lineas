import Button from '@/shared/ui/Button/Button';
import Input from '@/shared/ui/Input/Input';
import Link from 'next/link';
import styles from '../login.module.css';

interface ResetRequestFormProps {
  error: string | null;
  loading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export function ResetRequestForm({ error, loading, onSubmit }: ResetRequestFormProps) {
  return (
    <>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <Input
            label="Correo Electrónico"
            type="email"
            name="email"
            placeholder="admin@entrelineas.com"
            required
            autoComplete="email"
            className={styles.input}
          />
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}
        
<Button 
          type="submit" 
          variant="secondary" 
          fullWidth 
          size="large"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar Link de Recuperación'}
        </Button>
      </form>

<div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <Link 
          href="/admin/login" 
          style={{ 
            color: 'var(--color-text-muted)', 
            fontSize: '0.875rem', 
            textDecoration: 'none',
            borderBottom: '1px solid var(--color-border-light)',
            paddingBottom: '2px',
            transition: 'all var(--transition-base)'
          }}
        >
          ← Volver al Login
        </Link>
      </div>
    </>
  );
}
