'use client';

import { useState } from 'react';
import { resetPassword } from '@/app/actions/passwordActions';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import styles from '@/app/admin/login/login.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
              variant="primary" 
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
