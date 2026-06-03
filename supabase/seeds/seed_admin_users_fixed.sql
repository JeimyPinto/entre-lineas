-- =============================================================================
-- SEED: Admin Users (CORREGIDO)
-- 
-- IMPORTANTE: No crear usuarios directamente en auth.users
-- Los usuarios se crean en Supabase Dashboard → Authentication → Users
-- Este seed solo crea la tabla admin_users Referencias
--
-- PASOS:
-- 1. Crear usuarios en Supabase Admin UI
-- 2. Ejecutar este seed para otorgar permisos admin
-- =============================================================================

-- Insertar usuarios admin existentes en la tabla admin_users
-- Cambia los emails por los tuyos reales

INSERT INTO admin_users (user_id, email, role)
SELECT 
  id, 
  email, 
  'admin'
FROM auth.users
WHERE email IN (
  'jeimypintodev@gmail.com',
  'entr3line4s@gmail.com'
)
ON CONFLICT (user_id) DO NOTHING;

-- Verificar admins creadas
SELECT 
  au.email,
  au.role as admin_role,
  au.created_at
FROM admin_users au
ORDER BY au.created_at DESC;
