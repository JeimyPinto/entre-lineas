import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/shared/api/supabase';

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

  // Check for token and exchange code for session on mount
  useEffect(() => {
    async function checkToken() {
      console.log('[ResetPassword] Page loaded, checking URL:', window.location.href);
      
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        console.log('[ResetPassword] Found code in query params:', code);
        
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
      }

      // Check for OAuth tokens in hash
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

      // Check for existing session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        console.log('[ResetPassword] Existing session found');
        setTokenValid(true);
      } else {
        console.log('[ResetPassword] No token found in URL');
        setTokenValid(true);
      }
    }
    
    checkToken();
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

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
      } else {
        window.location.href = '/admin/login?reset=success';
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
