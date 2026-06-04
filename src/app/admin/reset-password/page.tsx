'use client';

import { useState, useEffect, Suspense } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import styles from '@/app/admin/login/login.module.css';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

// Check for token in URL
  useEffect(() => {
    const tokenHash = searchParams.get('token_hash');
    const type = searchParams.get('type');
    
    // Only allow if this is a password reset type
    if (type === 'email' && tokenHash) {
      setTokenValid(true);
    } else {
      // No token - redirect to login
      router.push('/admin/login?error=invalid_token');
    }
  }, [searchParams, router]);

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

    const response = await fetch('/api/admin/password/update', {
      method: 'POST',
      body: formData,
    });
    
    const result = await response.json();
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push('/admin/login?reset=success');
    }
  }

  if (tokenValid === null) {
    return (
      <div className={`${styles.loginContainer} admin-login-page`}>
        <Card className={styles.loginCard}>
          <div style={{ color: '#fff', textAlign: 'center', padding: '2rem' }}>
            Verificando token...
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={`${styles.loginContainer} admin-login-page`}>
      <Card className={styles.loginCard}>
        <div className={styles.header}>
          <Image src="/1-01.png" alt="Logo" width={80} height={80} className={styles.logo} />
          <h1>Nueva Contraseña</h1>
          <p>Ingresa tu nueva contraseña</p>
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

          {error && <div className={styles.errorMessage}>{error}</div>}
          
          <Button 
            type="submit" 
            variant="secondary" 
            fullWidth 
            size="large"
            disabled={loading}
          >
            {loading ? 'Actualizando...' : 'Cambiar Contraseña'}
          </Button>
        </form>
      </Card>
    </div>
  );
}

function ResetPasswordWithParams() {
  return (
    <Suspense fallback={<div style={{ color: '#fff', textAlign: 'center', padding: '2rem' }}>Cargando...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

export default function ResetPasswordPage() {
  return <ResetPasswordWithParams />;
}
