/**
 * Script para generar hashes de contraseña para admin_users
 * Ejecutar: npx tsx scripts/generate-admin-hash.ts
 */

import crypto from 'crypto';

// Función para generar hash (misma que en authService)
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('base64');
  const key = crypto.scryptSync(password, salt, 64);
  return `${salt}:${key.toString('base64')}`;
}

// Generar hashes para las contraseñas por defecto
const defaultPassword = 'Admin123!';
const hash = hashPassword(defaultPassword);

console.log('='.repeat(50));
console.log('Hash de contraseña generado');
console.log('='.repeat(50));
console.log(`Contraseña: ${defaultPassword}`);
console.log(`Hash: ${hash}`);
console.log('='.repeat(50));

// Guardar en stdout para usar en SQL
console.log('\n--- SQL para插入 ---');
console.log(`INSERT INTO admin_users (email, password, name, role, active)`);
console.log(`SELECT 'jeimypintodev@gmail.com', '${hash}', 'Jeimy Tatiana Pinto Tapia', 'admin', true`);
console.log(`WHERE NOT EXISTS (SELECT 1 FROM admin_users WHERE email = 'jeimytatianapinto@gmail.com');`);
console.log('');
console.log(`INSERT INTO admin_users (email, password, name, role, active)`);  
console.log(`SELECT 'entr3line4s@gmail.com', '${hash}', 'Sebastian Piedrahita Bucurú', 'admin', true`);
console.log(`WHERE NOT EXISTS (SELECT 1 FROM admin_users WHERE email = 'entr3line4s@gmail.com');`);
