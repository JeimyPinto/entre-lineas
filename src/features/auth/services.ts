'use server';

import { cookies } from 'next/headers';
import crypto from 'crypto';
import { createClient } from '@/shared/api/supabaseServer';

const COOKIE_NAME = 'admin_session';

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

/**
 * Genera token de sesión
 */
function generateSessionToken(email: string): string {
  const payload = `${email}:${Date.now()}`;
  return crypto.createHash('sha256').update(payload).digest('hex');
}

/**
 * Inicia sesión usando Supabase Auth
 */
export async function login(email: string, password: string): Promise<AuthUser> {
  const supabase = await createClient();
  
  // Autenticar con Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    console.error('Login error:', authError?.message);
    throw new Error('Credenciales incorrectas');
  }

  // Generar token de sesión propio
  const sessionToken = generateSessionToken(email);

  // Guardar cookie de sesión
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 horas
    path: '/',
  });

  // Obtener datos adicionales del usuario desde user_metadata
  const userMetadata = authData.user.user_metadata;
  
  return {
    id: authData.user.id,
    email: authData.user.email || email,
    name: userMetadata?.name || userMetadata?.full_name || null,
    role: userMetadata?.role || 'admin',
  };
}

/**
 * Cierra la sesión actual
 */
export async function logout(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Obtiene el usuario actual desde Supabase Auth
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);

  if (!cookie) {
    return null;
  }

  // Verificar sesión con Supabase
  const supabase = await createClient();
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      // Token expirado o inválido - limpiar cookie
      if (error?.message?.includes('token') || error?.message?.includes('expired')) {
        cookieStore.delete(COOKIE_NAME);
        console.log('[Auth] Session expired, cleared cookie');
      }
      return null;
    }

    const userMetadata = user.user_metadata;
    
    return {
      id: user.id,
      email: user.email || '',
      name: userMetadata?.name || userMetadata?.full_name || null,
      role: userMetadata?.role || 'admin',
    };
  } catch (error) {
    // Error de red u otro - asumir no autenticado
    console.error('[Auth] getCurrentUser error:', error);
    return null;
  }
}

/**
 * Verifica si hay una sesión activa
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}

/**
 * Crea hash de contraseña (para usar en seeds/setup)
 * Retorna formato: salt:hash (para referencia, pero usaremos Supabase Auth)
 */
export async function createPasswordHash(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString('base64');
  const key = crypto.scryptSync(password, salt, 64);
  return `${salt}:${key.toString('base64')}`;
}
