-- MIGRACIÓN: ESQUEMA LIMPIO DE ENTRE LÍNEAS

-- 1. TABLA DE ARTISTAS
CREATE TABLE IF NOT EXISTS artists (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  org_role TEXT[] DEFAULT '{}',
  image TEXT,
  image_position TEXT DEFAULT '50%',
  profession TEXT,
  origin TEXT,
  trajectory TEXT,
  bio TEXT[] DEFAULT '{}',
  socials JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  created_by UUID REFERENCES auth.users(id)
);

-- 2. TABLA DE EVENTOS
CREATE TABLE IF NOT EXISTS events (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  location TEXT,
  post_url TEXT,
  youtube_link TEXT,
  judges JSONB DEFAULT '[]',
  host JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 3. SEGURIDAD (RLS)
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "Lectura pública de artistas" ON artists;
DROP POLICY IF EXISTS "Gestión de artistas por admin" ON artists;
DROP POLICY IF EXISTS "Lectura pública de eventos" ON events;
DROP POLICY IF EXISTS "Gestión de eventos por admin" ON events;

-- Create policies (using IF NOT EXISTS for idempotency)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Lectura pública de artistas' AND tablename = 'artists') THEN
    CREATE POLICY "Lectura pública de artistas" ON artists FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Gestión de artistas por admin' AND tablename = 'artists') THEN
    CREATE POLICY "Gestión de artistas por admin" ON artists FOR ALL 
    USING (auth.uid() IS NOT NULL) 
    WITH CHECK (auth.uid() IS NOT NULL);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Lectura pública de eventos' AND tablename = 'events') THEN
    CREATE POLICY "Lectura pública de eventos" ON events FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Gestión de eventos por admin' AND tablename = 'events') THEN
    CREATE POLICY "Gestión de eventos por admin" ON events FOR ALL 
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);
  END IF;
END $$;
