'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/shared/api/supabase';
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
    async function handleTokenExchange() {
      console.log('[ResetPassword] Page loaded, checking URL:', window.location.href);
      
      // Supabase sends the access token in the URL hash (after #), not in query params
      // Format: /reset-password?#access_token=xxx&expires_in=xxx&refresh_token=xxx&token_type=Bearer&type=recovery
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      
      console.log('[ResetPassword] Hash params:', Object.fromEntries(hashParams.entries()));
      
      if (accessToken) {
        // Set the session using the access token from the URL hash
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || '',
        });
        
        if (sessionError) {
          console.error('[ResetPassword] Session error:', sessionError.message);
          setError('El link de recuperación ha expirado. Solicita uno nuevo.');
          setTokenValid(false);
          return;
        }
        
        console.log('[ResetPassword] Session set successfully');
        setTokenValid(true);
        
        // Clear the hash from URL for security (optional, but good practice)
        window.history.replaceState(null, '', window.location.pathname);
      } else {
        // Check if we have a session already (from cookies)
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log('[ResetPassword] Existing session found');
          setTokenValid(true);
        } else {
          console.log('[ResetPassword] No token in hash and no session');
          setTokenValid(true); // Will be validated server-side
        }
      }
    }
    
    handleTokenExchange();
  }, []);

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // Verify we have a session before submitting
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      setError('El link de recuperación ha expirado. Solicita uno nuevo.');
      setLoading(false);
      return;
    }

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
