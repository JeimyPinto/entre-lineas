-- SEED: Admin Users
-- Crea los usuarios administradores iniciales para el panel de control
-- Password por defecto: Admin123!

-- Usuario 1: Jeimy Tatiana Pinto Tapia
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at,
  role,
  aud,
  instance_id
)
SELECT
  gen_random_uuid(),
  'jeimytatianapinto@gmail.com',
  crypt('Admin123!', gen_salt('bf')),
  NOW(),
  jsonb_build_object(
    'role', 'admin',
    'name', 'Jeimy Tatiana Pinto Tapia',
    'alias', 'Jeimy'
  ),
  NOW(),
  NOW(),
  'authenticated',
  'authenticated',
  '00000000-0000-0000-0000-000000000000'
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'jeimytatianapinto@gmail.com'
);

-- Usuario 2: Sebastian Piedrahita Bucurú
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at,
  role,
  aud,
  instance_id
)
SELECT
  gen_random_uuid(),
  'entr3line4s@gmail.com',
  crypt('Admin123!', gen_salt('bf')),
  NOW(),
  jsonb_build_object(
    'role', 'admin',
    'name', 'Sebastian Piedrahita Bucurú',
    'alias', 'Sebas'
  ),
  NOW(),
  NOW(),
  'authenticated',
  'authenticated',
  '00000000-0000-0000-0000-000000000000'
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'entr3line4s@gmail.com'
);

-- Verificar usuarios creados
SELECT id, email, raw_user_meta_data->>'name' as name, raw_user_meta_data->>'role' as role 
FROM auth.users 
WHERE raw_user_meta_data->>'role' = 'admin';
