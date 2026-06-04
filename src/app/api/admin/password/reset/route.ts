import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/shared/api/supabaseServer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;

    if (!email) {
      return NextResponse.json(
        { error: 'Email requerido' },
        { status: 400 }
      );
    }
    
    const supabase = await createClient();
    
    // DEBUG: Log para ver el valor
    console.log('DEBUG NEXT_PUBLIC_SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL);
    console.log('DEBUG VERCEL_URL:', process.env.VERCEL_URL);
    
    // Always use a valid URL - prioritize VERCEL_URL or fallback to production URL
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim() !== '') 
      ? process.env.NEXT_PUBLIC_SITE_URL 
      : (process.env.VERCEL_URL || 'https://entre-lineas-rap.vercel.app');
    console.log('DEBUG siteUrl usado:', siteUrl);
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/admin/reset-password`,
    });

    if (error) {
      console.error('Reset password error:', error.message);
      return NextResponse.json(
        { error: 'No se pudo procesar la solicitud. Verifica el email.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
