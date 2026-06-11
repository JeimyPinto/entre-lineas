/**
 * Password hashing utilities using Web Crypto API
 * Compatible with both Node.js and Edge Runtime
 */

// Helper function to convert ArrayBuffer to hex string
function arrayBufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Helper function to convert hex string to ArrayBuffer
function hexToArrayBuffer(hex: string): ArrayBuffer {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes.buffer;
}

/**
 * Hash de contraseña usando PBKDF2 con Web Crypto API
 * Genera un salt aleatorio y lo incluye en el hash
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    // Generate a random salt
    const saltBuffer = new Uint8Array(32);
    crypto.getRandomValues(saltBuffer);
    const salt = arrayBufferToHex(saltBuffer.buffer);

    // Encode password as UTF-8
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    const saltBufferUint8 = Uint8Array.from(saltBuffer);

    // Import key for PBKDF2
    const key = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );

    // Derive key using PBKDF2
    const derivedKeyBuffer = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: saltBufferUint8,
        iterations: 100000,
        hash: 'SHA-256',
      },
      key,
      256 // 32 bytes = 256 bits
    );

    const hash = arrayBufferToHex(derivedKeyBuffer);
    return `${hash}.${salt}`;
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

    // Encode password as UTF-8
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    const saltBuffer = hexToArrayBuffer(salt);

    // Import key for PBKDF2
    const key = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );

    // Derive key using PBKDF2
    const derivedKeyBuffer = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: saltBuffer,
        iterations: 100000,
        hash: 'SHA-256',
      },
      key,
      256 // 32 bytes = 256 bits
    );

    const newHash = arrayBufferToHex(derivedKeyBuffer);
    return newHash === hash;
  } catch (error) {
    console.error('[verifyPassword] Error:', error);
    return false;
  }
}

/**
 * Generar token aleatorio para verificación de email/reset de contraseña
 */
export function generateVerificationToken(): string {
  const buffer = new Uint8Array(32);
  crypto.getRandomValues(buffer);
  return arrayBufferToHex(buffer.buffer);
}
