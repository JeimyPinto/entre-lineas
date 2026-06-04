'use server';

import { createClient } from '@/shared/api/supabaseServer';
import { redirect } from 'next/navigation';

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get('email') as string;

  if (!email) {
    return { error: 'Email requerido' };
  }

  try {
    const supabase = await createClient();
    
    // Solicitar reset de contraseña
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/reset-password`,
    });

    if (error) {
      console.error('Reset password error:', error.message);
      return { error: 'No se pudo procesar la solicitud. Verifica el email.' };
    }

    return { success: true };
  } catch (error) {
    console.error('Reset password error:', error);
    return { error: 'Error al procesar la solicitud' };
  }
}

export async function resetPassword(formData: FormData) {
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!password || !confirmPassword) {
    return { error: 'Contraseña requerida' };
  }

  if (password !== confirmPassword) {
    return { error: 'Las contraseñas no coinciden' };
  }

  if (password.length < 6) {
    return { error: 'La contraseña debe tener al menos 6 caracteres' };
  }

  try {
    const supabase = await createClient();
    
    // Actualizar contraseña
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.error('Update password error:', error.message);
      return { error: 'No se pudo actualizar la contraseña. El link puede haber expirado.' };
    }

    // Redireccionar al login con mensaje de éxito
    redirect('/admin/login?reset=success');
  } catch (error) {
    console.error('Update password error:', error);
    return { error: 'Error al actualizar la contraseña' };
  }
}
