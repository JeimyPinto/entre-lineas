-- =============================================================================
-- ELIMINAR TABLA admin_users
-- Eliminamos la tabla que ya no se usa (ahora usamos Supabase Auth)
-- =============================================================================

-- 1. Eliminar políticas existentes
DROP POLICY IF EXISTS "Usuarios autenticados pueden leer admins" ON admin_users;
DROP POLICY IF EXISTS "Solo admins pueden gestionar admins" ON admin_users;
DROP POLICY IF EXISTS "Solo admins pueden modificar artistas" ON artists;
DROP POLICY IF EXISTS "Solo admins pueden modificar eventos" ON events;
DROP POLICY IF EXISTS "artists_select_public" ON artists;
DROP POLICY IF EXISTS "artists_manage_by_admin" ON artists;
DROP POLICY IF EXISTS "events_select_public" ON events;
DROP POLICY IF EXISTS "events_manage_by_admin" ON events;
DROP POLICY IF EXISTS "admin_access" ON admin_users;

-- 2. Eliminar función helper
DROP FUNCTION IF EXISTS is_admin(UUID);

-- 3. Eliminar la tabla
DROP TABLE IF EXISTS admin_users CASCADE;

-- 4. Crear políticas simples para artists (solo usuarios autenticados)
CREATE POLICY "artists_all_authenticated" ON artists
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 5. Crear políticas simples para events (solo usuarios autenticados)
CREATE POLICY "events_all_authenticated" ON events
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
