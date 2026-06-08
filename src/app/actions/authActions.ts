'use server';

import { login, logout } from '@/features/auth/services';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function logoutAction() {
  try {
    await logout();
    revalidatePath('/admin');
  } catch (error) {
    console.error('Logout error:', error);
  }
  
  redirect('/admin/login');
}

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email y contraseña requeridos' };
  }

  try {
    await login(email, password);
    revalidatePath('/admin');
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Credenciales incorrectas';
    return { error: message };
  }

  redirect('/admin');
}
