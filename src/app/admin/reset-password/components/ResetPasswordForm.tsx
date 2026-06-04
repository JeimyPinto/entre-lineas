'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import styles from '../reset-password.module.css';

interface ResetPasswordFormProps {
  onSuccess?: () => void;
}

export default function ResetPasswordForm({ onSuccess }: ResetPasswordFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

// Check for token in URL - Supabase validates before redirecting
  useEffect(() => {
    console.log('[ResetPassword] Page loaded, checking params:', window.location.search);
    
    // If we reach this page, Supabase already validated the token
    // Just show the form
    setTokenValid(true);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/password/update', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else {
        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        } else {
          // Default: redirect to login with success message
          window.location.href = '/admin/login?reset=success';
        }
      }
    } catch (err) {
      setError('Error al procesar la solicitud');
      setLoading(false);
    }
  }

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
