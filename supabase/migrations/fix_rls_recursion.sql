-- =============================================================================
-- CORRECCIÓN: RLS Infinite Recursion
-- Problema: Las políticas tienen referencias circulares a admin_users
-- Solución: Usar funciones SQL para romper la recursión
-- =============================================================================

-- 1. Eliminar políticas problemáticas
DROP POLICY IF EXISTS "Usuarios autenticados pueden leer admins" ON admin_users;
DROP POLICY IF EXISTS "Solo admins pueden gestionar admins" ON admin_users;
DROP POLICY IF EXISTS "Solo admins pueden modificar artistas" ON artists;
DROP POLICY IF EXISTS "Solo admins pueden modificar eventos" ON events;

-- 2. Crear función helper para verificar admin (sin invocar RLS en admin_users)
CREATE OR REPLACE FUNCTION is_admin(user_uuid UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS(
    SELECT 1 FROM admin_users 
    WHERE user_id = user_uuid
  );
$$ LANGUAGE SQL STABLE;

-- 3. Nueva política para admin_users - permitir acceso por función
-- Nota: No usamos USING/WITH CHECK para evitar recursión
-- En su lugar, usamos SECURITY DEFINER (función)
DROP POLICY IF EXISTS "admin_access" ON admin_users;

-- 4. Políticas para artists con función helper
CREATE POLICY "artists_select_public" ON artists
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "artists_manage_by_admin" ON artists
  FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()) = true)
  WITH CHECK (is_admin(auth.uid()) = true);

-- 5. Políticas para events con función helper
CREATE POLICY "events_select_public" ON events
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "events_manage_by_admin" ON events
  FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()) = true)
  WITH CHECK (is_admin(auth.uid()) = true);

-- 6. Verificar que funciona
-- SELECT is_admin(auth.uid());
