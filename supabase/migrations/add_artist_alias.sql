-- =============================================================================
-- ADD COLUMN: alias to artists table
-- Adds artist name/alias for display in the interface
-- =============================================================================

-- Add alias column if not exists
ALTER TABLE artists ADD COLUMN IF NOT EXISTS alias TEXT;

-- Update existing records to set alias = name where alias is null
UPDATE artists SET alias = name WHERE alias IS NULL OR alias = '';

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_artists_alias ON artists(alias);
