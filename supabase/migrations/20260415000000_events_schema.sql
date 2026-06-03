-- MIGRACIÓN: Schema de Eventos (complemento a initial_schema)
-- Objetivo: Asegurar que la tabla events existe con el schema correcto

-- Verificar si la tabla events no existe y crearla
CREATE TABLE IF NOT EXISTS events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  location TEXT,
  post_url TEXT,
  youtube_link TEXT,
  judges JSONB DEFAULT '[]',
  host JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Habilitar RLS si no está habilitado
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Verificar existencia de políticas y crearlas si no existen
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Cualquiera puede leer eventos') THEN
    CREATE POLICY "Cualquiera puede leer eventos" ON events
      FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
END $$;
