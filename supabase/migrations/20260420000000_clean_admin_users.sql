-- ==============================================================================
-- MIGRACIÓN: Limpiar Admin Users
-- Objetivo: Simplificar el acceso al admin
-- 
-- El sistema actual funciona así:
-- 1. Cualquier usuario en auth.users con credenciales válidas puede acceder al admin
-- 2. El middleware (src/proxy.ts) verifica la sesión - si está autenticado, tiene acceso
-- 3. El campo 'role' en raw_user_meta_data es obsoleto - no se usa en el código
-- 
-- Esta migración:
-- 1. Limpia el campo 'role' obsoleto de raw_user_meta_data
-- 2. Guarda solo 'name' y 'alias' (útiles para mostrar en el admin)
-- ==============================================================================

-- Actualizar usuarios existentes: quitar 'role' del metadata
UPDATE auth.users 
SET raw_user_meta_data = jsonb_build_object(
    'name', COALESCE(raw_user_meta_data->>'name', split_part(email, '@', 1)),
    'alias', COALESCE(raw_user_meta_data->>'alias', split_part(email, '@', 1))
  )
WHERE raw_user_meta_data->>'role' IS NOT NULL;

-- Verificar usuarios limpiados
SELECT 
  id, 
  email, 
  raw_user_meta_data->>'name' as name,
  raw_user_meta_data->>'alias' as alias,
  raw_user_meta_data->>'role' as old_role
FROM auth.users
WHERE raw_user_meta_data->>'role' IS NOT NULL;
