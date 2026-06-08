import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminLayoutClient from './AdminLayoutClient';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Redirect to login if no session
  if (!session?.user) {
    redirect('/login?callbackUrl=/admin');
  }

  return (
    <AdminLayoutClient user={session.user}>
      {children}
    </AdminLayoutClient>
  );
}