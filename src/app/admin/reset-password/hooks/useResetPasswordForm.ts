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
      // Wait a moment for Supabase's auto-detectSessionInUrl to process hash tokens
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('[ResetPassword] Page loaded, checking URL:', window.location.href);
      console.log('[ResetPassword] Hash:', window.location.hash);
      
      // Method 1: Check for PKCE code in query params (?code=xxx)
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

      // Method 2: Check for tokens in URL hash fragment (#access_token=xxx&type=recovery)
      // This handles Supabase's recovery flow that sends tokens in the hash
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      const type = hashParams.get('type');
      
      console.log('[ResetPassword] Hash params:', Object.fromEntries(hashParams.entries()));

      // Handle recovery flow - tokens in hash with type=recovery
      if (accessToken && (type === 'recovery' || type === 'signup')) {
        console.log('[ResetPassword] Processing recovery flow with hash tokens');
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
        
        console.log('[ResetPassword] Session set successfully from recovery flow');
        setTokenValid(true);
        // Clean URL - remove hash but stay on this page
        window.history.replaceState(null, '', window.location.pathname);
        return;
      }

      // Method 3: Any other access token in hash (OAuth implicit flow)
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

      // Method 4: Check for existing session
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
