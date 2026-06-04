import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    console.log('[Password Update] Request received');
    const formData = await request.formData();
    console.log('[Password Update] FormData keys:', Array.from(formData.keys()));
    
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (!password || !confirmPassword) {
      return NextResponse.json(
        { error: 'Contraseña requerida' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Las contraseñas no coinciden' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    
    // Create client with PKCE and cookies to maintain the session from the reset link
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          flowType: 'pkce',
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
        },
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // This can fail in edge middleware
            }
          },
        },
      }
    );

    // First, get the current session to verify user is authenticated via the reset link
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Session error:', sessionError.message);
    }
    
    if (!session) {
      console.error('[Password Update] No session found - access token may have expired');
      return NextResponse.json(
        { error: 'El link de recuperación ha expirado. Por favor solicita uno nuevo.' },
        { status: 400 }
      );
    }

    console.log('[Password Update] Session found for user:', session.user.id);
    
    // Now update the password with the authenticated session
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.error('Update password error:', error.message);
      return NextResponse.json(
        { error: 'No se pudo actualizar la contraseña. El link puede haber expirado.' },
        { status: 500 }
      );
    }

    // Sign out after password change for security
    await supabase.auth.signOut();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update password error:', error);
    return NextResponse.json(
      { error: 'Error al actualizar la contraseña' },
      { status: 500 }
    );
  }
}
