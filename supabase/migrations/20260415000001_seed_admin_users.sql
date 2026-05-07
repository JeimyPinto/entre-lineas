-- Seed: Admin Users
-- Crea los dos usuarios administradores iniciales
-- Password por defecto para ambos: Admin123!

-- Usuario 1: Jeimy Tatiana Pinto Tapia
INSERT INTO auth.users (
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at,
  role,
  aud
)
SELECT
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
  'authenticated'
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'jeimytatianapinto@gmail.com'
);

-- Usuario 2: Sebastian Piedrahita Bucurú
INSERT INTO auth.users (
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at,
  role,
  aud
)
SELECT
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
  'authenticated'
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'entr3line4s@gmail.com'
);
