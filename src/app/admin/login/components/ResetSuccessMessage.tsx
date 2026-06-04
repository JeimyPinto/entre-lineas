import Button from '@/components/ui/Button';
import Link from 'next/link';

interface ResetSuccessMessageProps {
  linkHref?: string;
  linkText?: string;
}

export function ResetSuccessMessage({ linkHref = '/admin/login', linkText = 'Volver al Login' }: ResetSuccessMessageProps) {
  return (
    <Link href={linkHref} style={{ display: 'block', width: '100%' }}>
      <Button variant="primary" fullWidth size="large">
        {linkText}
      </Button>
    </Link>
  );
}
