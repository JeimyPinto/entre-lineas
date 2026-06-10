import { useState, useCallback, useEffect } from 'react';

interface UseResetPasswordFormReturn {
  error: string | null;
  loading: boolean;
  tokenValid: boolean | null;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export function useResetPasswordForm(): UseResetPasswordFormReturn {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  // Validar token en mount
  useEffect(() => {
    async function checkToken() {
      console.log('[ResetPassword] Page loaded, checking URL:', window.location.href);
      
      // Buscar token en query params (?token=xxx)
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (!token) {
        console.warn('[ResetPassword] No token found in URL');
        setError('Token de recuperación no válido');
        setTokenValid(false);
        return;
      }

      console.log('[ResetPassword] Token found in URL');
      setTokenValid(true);
    }
    
    checkToken();
  }, []);

  // Manejar envío del formulario
  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // Obtener token del URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (!token) {
      setError('Token de recuperación no válido');
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
      // Llamar a la API de confirmación
      const response = await fetch('/api/admin/password/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        setError(result?.error || 'Error al actualizar contraseña');
      } else {
        // Éxito - redirigir a login
        window.location.href = '/login?reset=success';
      }
    } catch (err) {
      console.error('[ResetPassword] Submit error:', err);
      setError('Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    error,
    loading,
    tokenValid,
    handleSubmit,
  };
}
