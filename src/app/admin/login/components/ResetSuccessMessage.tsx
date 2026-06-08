import Button from '@/shared/ui/Button/Button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ResetSuccessMessageProps {
  linkHref?: string;
  linkText?: string;
}

export function ResetSuccessMessage({ linkHref = '/admin/login', linkText = 'Volver al Login' }: ResetSuccessMessageProps) {
  const router = useRouter();
  
  const handleClick = () => {
    // Open login in new tab
    window.open(linkHref, '_blank', 'noopener,noreferrer');
    // Close current tab/window
    window.close();
  };

  return (
    <Button variant="primary" fullWidth size="large" onClick={handleClick} type="button">
      {linkText}
    </Button>
  );
}
