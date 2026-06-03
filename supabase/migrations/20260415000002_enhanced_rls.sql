-- MIGRACIÓN: Reforzar RLS (Row Level Security)
-- Objetivo: Políticas más granulares para tabla admin

-- 1. CREAR TABLA DE ADMINISTRADORES
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Habilitar RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 2. POLÍTICAS PARA admin_users

-- Cualquier usuario autenticado puede ver la tabla (para verificar si es admin)
CREATE POLICY "Usuarios autenticados pueden leer admins" ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

--Solo los admins existentes pueden agregar nuevos admins
CREATE POLICY "Solo admins pueden gestionar admins" ON admin_users
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (SELECT user_id FROM admin_users)
  )
  WITH CHECK (
    auth.uid() IN (SELECT user_id FROM admin_users)
  );

-- 3. ACTUALIZAR POLÍTICAS EXISTENTES PARA artists

-- Eliminar políticas anteriores (si existen)
DROP POLICY IF EXISTS "Gestión de artistas por admin" ON artists;
DROP POLICY IF EXISTS "Gestión de eventos por admin" ON events;

-- Crear políticas de forma idempotente (solo si no existen)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Cualquiera puede leer artistas' AND tablename = 'artists') THEN
    CREATE POLICY "Cualquiera puede leer artistas" ON artists
      FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Solo admins pueden modificar artistas' AND tablename = 'artists') THEN
    CREATE POLICY "Solo admins pueden modificar artistas" ON artists
      FOR ALL
      TO authenticated
      USING (
        auth.uid() IN (SELECT user_id FROM admin_users)
      )
      WITH CHECK (
        auth.uid() IN (SELECT user_id FROM admin_users)
      );
  END IF;
END $$;

-- 4. ACTUALIZAR POLÍTICAS PARA events

-- Crear políticas de forma idempotente (solo si no existen)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Cualquiera puede leer eventos' AND tablename = 'events') THEN
    CREATE POLICY "Cualquiera puede leer eventos" ON events
      FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Solo admins pueden modificar eventos' AND tablename = 'events') THEN
    CREATE POLICY "Solo admins pueden modificar eventos" ON events
      FOR ALL
      TO authenticated
      USING (
        auth.uid() IN (SELECT user_id FROM admin_users)
      )
      WITH CHECK (
        auth.uid() IN (SELECT user_id FROM admin_users)
      );
  END IF;
END $$;

-- 5. INSERTAR USUARIOS ADMIN EXISTENTES
-- Ejecutar esto manualmente con tus usuarios:
-- INSERT INTO admin_users (user_id, email, role)
-- SELECT id, email, 'admin' FROM auth.users WHERE email = 'tu-email@ejemplo.com';
