'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLoginForm } from './hooks/useLoginForm';
import { usePasswordResetForm } from './hooks/usePasswordResetForm';
import { LoginCard, LoginFormComponent, ResetRequestForm, ResetSuccessMessage } from './components';

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
      <LoginCard title="Sesión Expirada" subtitle="Tu sesión ha expirado. Por favor, ingresa tus credenciales nuevamente.">
        <LoginFormComponent
          error={null}
          loading={loginForm.loading}
          onSubmit={loginForm.handleLogin}
        />
      </LoginCard>
    );
  }

  if (resetSuccess) {
    return (
      <LoginCard title="Contraseña Actualizada" subtitle="Tu contraseña ha sido cambiada exitosamente. Ya puedes iniciar sesión.">
        <ResetSuccessMessage />
      </LoginCard>
    );
  }

  if (resetForm.sent) {
    return (
      <LoginCard title="Revisa tu Email" subtitle="Te hemos enviado un link para recuperar tu contraseña. Revisa tu bandeja de entrada.">
        <ResetSuccessMessage linkText="Volver al Login" />
      </LoginCard>
    );
  }

  if (resetRequestMode) {
    return (
      <LoginCard title="Recuperar Contraseña" subtitle="Ingresa tu correo para recibir el link de recuperación">
        <ResetRequestForm
          error={resetForm.error}
          loading={resetForm.loading}
          onSubmit={resetForm.handleResetRequest}
        />
      </LoginCard>
    );
  }

  // Login normal
  return (
    <LoginCard title="Panel de Control" subtitle="Ingresa tus credenciales para gestionar artistas y eventos">
      <LoginFormComponent
        error={loginForm.error}
        loading={loginForm.loading}
        onSubmit={loginForm.handleLogin}
      />
    </LoginCard>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ color: '#fff', textAlign: 'center', padding: '2rem' }}>Cargando...</div>}>
      <LoginForm />
    </Suspense>
  );
}
