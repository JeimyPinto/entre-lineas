'use server';

import { cookies } from 'next/headers';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

const COOKIE_NAME = 'admin_session';

/**
 * Genera hash de contraseña usando scrypt de Node.js
 * Formato almacenado: salt:hash (ambos en base64)
 */
function hashPassword(password: string): { salt: string; hash: string } {
  const salt = crypto.randomBytes(16).toString('base64');
  const key = crypto.scryptSync(password, salt, 64);
  return {
    salt,
    hash: key.toString('base64'),
  };
}

/**
 * Verifica contraseña contra hash almacenado
 * Formato esperado en DB: salt:hash
 */
function verifyPassword(password: string, storedValue: string): boolean {
  const [salt, storedHash] = storedValue.split(':');
  if (!salt || !storedHash) return false;
  
  const key = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(
    Buffer.from(storedHash, 'base64'),
    Buffer.from(key.toString('base64'), 'base64')
  );
}

/**
 * Genera token de sesión
 */
function generateSessionToken(email: string): string {
  const payload = `${email}:${Date.now()}`;
  return crypto.createHash('sha256').update(payload).digest('hex');
}

export interface AuthUser {
  id: number;
  email: string;
  name: string | null;
  role: string;
}

export const authService = {
  /**
   * Inicia sesión con correo y contraseña usando la tabla AdminUser de Prisma
   */
  async login(email: string, password: string): Promise<AuthUser> {
    // Buscar usuario en la tabla admin_users
    const user = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Credenciales incorrectas');
    }

    if (!user.active) {
      throw new Error('Usuario inactivo');
    }

    // Verificar contraseña usando el hash almacenado (formato: salt:hash)
    const isValid = verifyPassword(password, user.password);
    
    if (!isValid) {
      throw new Error('Credenciales incorrectas');
    }

    // Generar token de sesión
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

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  },

  /**
   * Cierra la sesión actual
   */
  async logout(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
  },

  /**
   * Obtiene el usuario actual desde la cookie de sesión
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(COOKIE_NAME);

    if (!cookie) {
      return null;
    }

    // TODO: Implementar sesión server-side más robusta
    // Por ahora retornamos null - el middleware verificará la sesión
    return null;
  },

  /**
   * Verifica si hay una sesión activa
   */
  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  },

  /**
   * Crea hash de contraseña (para usar en seeds/setup)
   * Retorna formato: salt:hash
   */
  createPasswordHash(password: string): string {
    const { salt, hash } = hashPassword(password);
    return `${salt}:${hash}`;
  },

  /**
   * Verifica contraseña (para uso interno)
   */
  verifyPassword,
};
