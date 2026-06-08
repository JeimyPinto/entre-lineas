'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaHouse } from 'react-icons/fa6';
import { useLoginForm } from './hooks/useLoginForm';
import { usePasswordResetForm } from './hooks/usePasswordResetForm';
import { LoginCard, LoginFormComponent, ResetRequestForm, ResetSuccessMessage } from './components';
import styles from './login.module.css';

function LoginForm() {
  const searchParams = useSearchParams();
  const loginForm = useLoginForm();
  const resetForm = usePasswordResetForm();
  
  const resetMode = searchParams.get('reset');
  const resetSuccess = resetMode === 'success';
  const resetRequestMode = resetMode === 'request';
  const sessionExpired = searchParams.get('expired') === 'true';

  // Estados del flujo de recuperación
  if (sessionExpired) {
    return (
      <div className={styles.loginContainer}>
        <Link href="/" className={styles.backLink} title="Volver a Entre Líneas">
          <FaHouse size={16} />
          <span>Volver a Entre Líneas</span>
        </Link>
        <LoginCard title="Sesión Expirada" subtitle="Tu sesión ha expirado. Por favor, ingresa tus credenciales nuevamente.">
          <LoginFormComponent
            error={null}
            loading={loginForm.loading}
            onSubmit={loginForm.handleLogin}
          />
        </LoginCard>
      </div>
    );
  }

  if (resetSuccess) {
    return (
      <div className={styles.loginContainer}>
        <Link href="/" className={styles.backLink} title="Volver a Entre Líneas">
          <FaHouse size={16} />
          <span>Volver a Entre Líneas</span>
        </Link>
        <LoginCard title="Contraseña Actualizada" subtitle="Tu contraseña ha sido cambiada exitosamente. Ya puedes iniciar sesión.">
          <ResetSuccessMessage />
        </LoginCard>
      </div>
    );
  }

  if (resetForm.sent) {
    return (
      <div className={styles.loginContainer}>
        <Link href="/" className={styles.backLink} title="Volver a Entre Líneas">
          <FaHouse size={16} />
          <span>Volver a Entre Líneas</span>
        </Link>
        <LoginCard title="Revisa tu Email" subtitle="Te hemos enviado un link para recuperar tu contraseña. Revisa tu bandeja de entrada.">
          <ResetSuccessMessage linkText="Volver al Login" />
        </LoginCard>
      </div>
    );
  }

  if (resetRequestMode) {
    return (
      <div className={styles.loginContainer}>
        <Link href="/" className={styles.backLink} title="Volver a Entre Líneas">
          <FaHouse size={16} />
          <span>Volver a Entre Líneas</span>
        </Link>
        <LoginCard title="Recuperar Contraseña" subtitle="Ingresa tu correo para recibir el link de recuperación">
          <ResetRequestForm
            error={resetForm.error}
            loading={resetForm.loading}
            onSubmit={resetForm.handleResetRequest}
          />
        </LoginCard>
      </div>
    );
  }

  // Login normal
  return (
    <div className={styles.loginContainer}>
      <Link href="/" className={styles.backLink} title="Volver a Entre Líneas">
        <FaHouse size={16} />
        <span>Volver a Entre Líneas</span>
      </Link>
      <LoginCard title="Panel de Control" subtitle="Ingresa tus credenciales para gestionar artistas y eventos">
        <LoginFormComponent
          error={loginForm.error}
          loading={loginForm.loading}
          onSubmit={loginForm.handleLogin}
        />
      </LoginCard>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className={styles.loginContainer}>
        <div className={styles.cardWrapper}>
          <div className={styles.loadingOverlay}>
            <div className={styles.spinner} />
          </div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}