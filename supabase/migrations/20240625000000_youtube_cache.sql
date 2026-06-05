-- YouTube cache table for persistent caching
CREATE TABLE IF NOT EXISTS youtube_cache (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE youtube_cache ENABLE ROW LEVEL SECURITY;

-- Allow read access to everyone
CREATE POLICY "Allow public read" ON youtube_cache
  FOR SELECT USING (true);

-- Allow admin write access  
CREATE POLICY "Allow admin update" ON youtube_cache
  FOR UPDATE USING (true);

-- Allow insert for admin
CREATE POLICY "Allow admin insert" ON youtube_cache
  FOR INSERT WITH CHECK (true);

-- Social networks table: platform + URL per artist
CREATE TABLE IF NOT EXISTS artist_socials (
  id SERIAL PRIMARY KEY,
  artist_id INTEGER NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  label TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE artist_socials ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Allow public read artist_socials" ON artist_socials
  FOR SELECT USING (true);

-- Allow admin full access
CREATE POLICY "Allow admin artist_socials" ON artist_socials
  FOR ALL USING (true);
