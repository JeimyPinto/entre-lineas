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
