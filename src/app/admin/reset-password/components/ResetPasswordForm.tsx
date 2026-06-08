'use client';

import { useEffect } from 'react';
import Button from '@/shared/ui/Button/Button';
import Input from '@/shared/ui/Input/Input';
import Card from '@/shared/ui/Card/Card';
import { useResetPasswordForm } from '../hooks/useResetPasswordForm';
import styles from '../reset-password.module.css';

interface ResetPasswordFormProps {
  onSuccess?: () => void;
}

export default function ResetPasswordForm({ onSuccess }: ResetPasswordFormProps) {
  const { error, loading, tokenValid, handleSubmit } = useResetPasswordForm();

  // Call onSuccess callback when password is successfully changed
  useEffect(() => {
    if (onSuccess && tokenValid === true) {
      onSuccess();
    }
  }, [onSuccess, tokenValid]);

  // Loading state while verifying token
  if (tokenValid === null) {
    return (
      <div className={styles.container}>
        <Card className={styles.card}>
          <div className={styles.loading}>
            Verificando token...
          </div>
        </Card>
      </div>
    );
  }

  // Render the form
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.header}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/1-01.png" 
            alt="Logo" 
            width={80} 
            height={80} 
            className={styles.logo} 
          />
          <h1 className={styles.title}>Nueva Contraseña</h1>
          <p className={styles.subtitle}>Ingresa tu nueva contraseña</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <Input
              label="Nueva Contraseña"
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className={styles.input}
              minLength={6}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <Input
              label="Confirmar Contraseña"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              required
              className={styles.input}
              minLength={6}
            />
          </div>

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}
          
          <div className={styles.buttonContainer}>
            <Button 
              type="submit" 
              variant="secondary" 
              fullWidth 
              size="large"
              disabled={loading}
            >
              {loading ? 'Actualizando...' : 'Cambiar Contraseña'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
