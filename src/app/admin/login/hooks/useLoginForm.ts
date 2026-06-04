import { useState, useCallback } from 'react';
import { loginAction } from '@/app/actions/authActions';
import { useRouter } from 'next/navigation';

interface UseLoginFormReturn {
  error: string | null;
  loading: boolean;
  handleLogin: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  clearError: () => void;
}

export function useLoginForm(): UseLoginFormReturn {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await loginAction(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { error, loading, handleLogin, clearError };
}
