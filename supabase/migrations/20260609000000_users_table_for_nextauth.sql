-- ==============================================================================
-- MIGRACIÓN: Crear tabla users para NextAuth
-- 
-- OBJETIVO:
-- Esta tabla almacena el perfil extendido de usuarios más allá de lo que provee Supabase Auth.
-- NextAuth la usa para obtener role, org_role, name, image en el login.
--
-- ESTRUCTURA:
-- - user_id: FK a auth.users.id
-- - role: rol principal ('admin' | 'user')
-- - org_role: array de roles organizacionales (e.g., ['admin', 'editor'])
-- - name: nombre para mostrar
-- - image: avatar URL
-- ==============================================================================

-- 1. CREAR TABLA users
CREATE TABLE IF NOT EXISTS users (
  user_id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  role TEXT DEFAULT 'user',
  org_role TEXT[] DEFAULT '{}',
  name TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- 2. CREAR ÍNDICES para búsquedas frecuentes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- 3. HABILITAR RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 4. POLÍTICAS RLS
-- Todos pueden leer usuarios (para autenticación)
DROP POLICY IF EXISTS "Anyone can read users" ON users;
CREATE POLICY "Anyone can read users" ON users FOR SELECT USING (true);

-- Solo usuarios autenticados pueden actualizar su propio perfil
DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile" ON users 
  FOR UPDATE USING (auth.uid() = user_id);

-- Solo admins pueden insertar/actualizar otros usuarios
DROP POLICY IF EXISTS "Service role can manage users" ON users;
CREATE POLICY "Service role can manage users" ON users 
  FOR ALL USING (auth.role() = 'service_role');

-- 5. FUNCIÓN TRIGGER para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger si no existe
DROP TRIGGER IF EXISTS trigger_update_users_updated_at ON users;
CREATE TRIGGER trigger_update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_users_updated_at();

-- 6. VERIFICAR CREACIÓN
-- SELECT * FROM users LIMIT 0; -- Verify table exists

-- NOTA: Los usuarios existentes deben migrarse con el script:
-- scripts/migrate_users_to_nextauth.ts
