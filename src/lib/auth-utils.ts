import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

/**
 * Hash de contraseña usando PBKDF2 nativo de Node.js (crypto module)
 * Genera un salt aleatorio y lo incluye en el hash
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = randomBytes(32).toString('hex');
    const hash = (await scryptAsync(password, salt, 32)) as Buffer;
    return `${hash.toString('hex')}.${salt}`;
  } catch (error) {
    console.error('[hashPassword] Error:', error);
    throw new Error('Failed to hash password');
  }
}

/**
 * Verificar contraseña contra hash almacenado
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    const [hash, salt] = hashedPassword.split('.');
    if (!hash || !salt) {
      console.error('[verifyPassword] Invalid hash format');
      return false;
    }
    
    const newHash = (await scryptAsync(password, salt, 32)) as Buffer;
    return newHash.toString('hex') === hash;
  } catch (error) {
    console.error('[verifyPassword] Error:', error);
    return false;
  }
}

/**
 * Generar token aleatorio para verificación de email/reset de contraseña
 */
export function generateVerificationToken(): string {
  return randomBytes(32).toString('hex');
}
