-- =============================================================================
-- CREATE TABLE: artist_socials for storing artist social media links
-- Separates social links from artists table for better normalization
-- =============================================================================

-- Create artist_socials table
CREATE TABLE IF NOT EXISTS artist_socials (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  artist_id BIGINT NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  label TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable Row Level Security
ALTER TABLE artist_socials ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "Lectura pública de artist_socials" ON artist_socials;
DROP POLICY IF EXISTS "Gestión de artist_socials por admin" ON artist_socials;

-- Create policies
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Lectura pública de artist_socials' AND tablename = 'artist_socials') THEN
    CREATE POLICY "Lectura pública de artist_socials" ON artist_socials FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Gestión de artist_socials por admin' AND tablename = 'artist_socials') THEN
    CREATE POLICY "Gestión de artist_socials por admin" ON artist_socials FOR ALL 
    USING (auth.uid() IS NOT NULL) 
    WITH CHECK (auth.uid() IS NOT NULL);
  END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_artist_socials_artist_id ON artist_socials(artist_id);
CREATE INDEX IF NOT EXISTS idx_artist_socials_platform ON artist_socials(platform);
CREATE INDEX IF NOT EXISTS idx_artist_socials_artist_platform ON artist_socials(artist_id, platform);