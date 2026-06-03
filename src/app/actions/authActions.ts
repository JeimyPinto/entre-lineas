'use server';

import { authService } from '@/features/auth/services';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function logoutAction() {
  try {
    await authService.logout();
    revalidatePath('/admin');
  } catch (error) {
    console.error('Logout error:', error);
  }
  
  redirect('/admin/login');
}

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    await authService.login(email, password);
    revalidatePath('/admin');
  } catch (error: any) {
    return { error: error.message || 'Credenciales incorrectas' };
  }

  redirect('/admin/dashboard');
}

