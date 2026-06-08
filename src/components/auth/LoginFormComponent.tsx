import Button from '@/shared/ui/Button/Button';
import Input from '@/shared/ui/Input/Input';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import styles from './login.module.css';

interface LoginFormComponentProps {
  error: string | null;
  loading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export function LoginFormComponent({ 
  error, 
  loading, 
  onSubmit, 
  showPassword = false,
  onTogglePassword 
}: LoginFormComponentProps) {
  return (
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
      
      <div className={styles.inputGroup}>
        <div className={styles.passwordWrapper}>
          <Input
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="••••••••"
            required
            autoComplete="current-password"
            className={styles.input}
          />
          {onTogglePassword && (
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={onTogglePassword}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          )}
        </div>
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
          href="/api/auth/signin?callbackUrl=/admin" 
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