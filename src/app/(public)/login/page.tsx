'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { FaHouse } from 'react-icons/fa6';
import { LoginCard, LoginFormComponent } from '@/components/auth';
import styles from '@/components/auth/login.module.css';

function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';
  const error = searchParams.get('error');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      setFormError('Email y contraseña requeridos');
      setIsLoading(false);
      return;
    }

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      setFormError(result.error);
      setIsLoading(false);
    } else if (result?.ok) {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Link href="/" className={styles.backLink} title="Volver a Entre Líneas">
        <FaHouse size={16} />
        <span>Volver a Entre Líneas</span>
      </Link>
      <LoginCard 
        title="Panel de Control" 
        subtitle="Ingresa tus credenciales para gestionar artistas y eventos"
      >
        <LoginFormComponent
          error={formError || error}
          loading={isLoading}
          onSubmit={handleSubmit}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />
      </LoginCard>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className={styles.loginContainer}>Cargando...</div>}>
      <LoginForm />
    </Suspense>
  );
}