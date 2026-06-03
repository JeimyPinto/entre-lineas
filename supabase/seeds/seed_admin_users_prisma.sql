-- SEED: Admin Users para Prisma
-- Sistema de auth propio usando tabla admin_users
-- Password por defecto: Admin123!
-- Hash generado con crypto.scryptSync de Node.js

-- Jeimy Tatiana Pinto Tapia
INSERT INTO admin_users (email, password, name, role, active)
SELECT 
  'jeimytatianapinto@gmail.com',
  '+vvNGP2Aiojg4IPIw3CdQg==:ZzVZvOR8LWSPned5PevXjAg/H1t8xAcAiMnAwFnnYoMprAPXHgxTQ97pp8Oo3hclPi/e93lF+0WQdaclN3iEkg==',
  'Jeimy Tatiana Pinto Tapia',
  'admin',
  true
WHERE NOT EXISTS (
  SELECT 1 FROM admin_users WHERE email = 'jeimytatianapinto@gmail.com'
);

-- Sebastian Piedrahita Bucurú
INSERT INTO admin_users (email, password, name, role, active)
SELECT 
  'entr3line4s@gmail.com',
  '+vvNGP2Aiojg4IPIw3CdQg==:ZzVZvOR8LWSPned5PevXjAg/H1t8xAcAiMnAwFnnYoMprAPXHgxTQ97pp8Oo3hclPi/e93lF+0WQdaclN3iEkg==',
  'Sebastian Piedrahita Bucurú',
  'admin',
  true
WHERE NOT EXISTS (
  SELECT 1 FROM admin_users WHERE email = 'entr3line4s@gmail.com'
);

-- Verificar usuarios creados
SELECT id, email, name, role, active FROM admin_users;
