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
      
      // Method 1: Check for email action code in query params (?code=xxx)
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      
      if (code) {
        console.log('[ResetPassword] Found code in query params:', code);
        
        // Exchange the code for a session via API call
        // supabase.auth.exchangeCodeForSession was added in v2, try via internal API
        try {
          const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
          
          // Call the Supabase auth exchange endpoint directly
          const response = await fetch(`${supabaseUrl}/auth/v1/odata/v4/Token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({
              grant_type: 'urn:ietf:params:oauth:grant-type:migration_off',
              code: code,
            }),
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log('[ResetPassword] Code exchange success');
            
            // Set session with returned tokens
            if (data.access_token) {
              await supabase.auth.setSession({
                access_token: data.access_token,
                refresh_token: data.refresh_token || '',
              });
              
              setTokenValid(true);
              window.history.replaceState(null, '', window.location.pathname);
              return;
            }
          }
        } catch (e) {
          console.error('[ResetPassword] Code exchange error:', e);
        }
        
// Try standard method if direct API fails - check if method exists
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const auth = supabase.auth as any;
        if (typeof auth.exchangeCodeForSession === 'function') {
          const { error: sessionError } = await auth.exchangeCodeForSession(code);
          
          if (sessionError) {
            console.error('[ResetPassword] Exchange error:', sessionError.message);
            setError('El link de recuperación ha expirado. Solicita uno nuevo.');
            setTokenValid(false);
            return;
          }
          
          console.log('[ResetPassword] Session exchanged successfully');
          setTokenValid(true);
          window.history.replaceState(null, '', window.location.pathname);
          return;
        }
        
        // If still no success, check session
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setTokenValid(true);
          return;
        }
        
        setError('El link de recuperación ha expirado. Solicita uno nuevo.');
        setTokenValid(false);
        return;
      }
      
      // Method 2: Check for OAuth tokens in URL hash (for OAuth flow)
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      
      console.log('[ResetPassword] Hash params:', Object.fromEntries(hashParams.entries()));
      
      if (accessToken) {
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
        window.history.replaceState(null, '', window.location.pathname);
        return;
      }
      
      // Method 3: Check if we have a session already
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        console.log('[ResetPassword] Existing session found');
        setTokenValid(true);
      } else {
        console.log('[ResetPassword] No token found in URL');
        setTokenValid(true);
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
} catch (error) {
      console.error('[ResetPassword] Submit error:', error);
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
