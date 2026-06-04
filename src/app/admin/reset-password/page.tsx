'use client';

import { Suspense } from 'react';
import { ResetPasswordForm } from './components';

function Loading() {
  return (
    <div style={{ 
      color: '#fff', 
      textAlign: 'center', 
      padding: '2rem' 
    }}>
      Cargando...
    </div>
  );
}

function ResetPasswordWithSuspense() {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPasswordForm />
    </Suspense>
  );
}

export default function ResetPasswordPage() {
  return <ResetPasswordWithSuspense />;
}
