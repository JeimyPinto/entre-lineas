'use client';

import { useState } from 'react';
import { loginAction } from '@/app/actions/authActions';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import styles from './login.module.css';
import Image from 'next/image';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await loginAction(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className={styles.loginContainer}>
      <Card className={styles.loginCard}>
        <div className={styles.header}>
          <Image src="/1-01.png" alt="Logo" width={80} height={80} className={styles.logo} />
          <h1>Panel de Control</h1>
          <p>Ingresa tus credenciales para gestionar artistas y eventos</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
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
        </form>
      </Card>
    </div>
  );
}
