import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface UsePasswordResetFormReturn {
  error: string | null;
  loading: boolean;
  sent: boolean;
  handleResetRequest: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  clearError: () => void;
}

export function usePasswordResetForm(): UsePasswordResetFormReturn {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResetRequest = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const response = await fetch('/api/admin/password/reset', {
      method: 'POST',
      body: formData,
    });
    
    const result = await response.json();
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSent(true);
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { error, loading, sent, handleResetRequest, clearError };
}
