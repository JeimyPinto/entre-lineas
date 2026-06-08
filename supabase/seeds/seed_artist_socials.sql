-- SEED DATA: SOCIAL LINKS FOR ARTISTS
-- Run after seeding artists to get the correct artist IDs

-- Clear existing artist socials first
DELETE FROM artist_socials;

-- Insert social links for Galáctico
INSERT INTO artist_socials (artist_id, platform, url, label)
SELECT a.id, 'instagram', 'https://www.instagram.com/_mr_galactico_', 'Instagram'
FROM artists a
WHERE a.name = 'Galáctico';

-- Insert social links for all artists from the bulk seed
INSERT INTO artist_socials (artist_id, platform, url, label)
SELECT 
  a.id,
  'instagram',
  CASE a.name
    WHEN 'Ray' THEN 'https://www.instagram.com/ray_oficialr'
    WHEN 'ZER' THEN 'https://www.instagram.com/zerlamortmamut?igsh=cmpiZ2Y1YW90YWk2'
    WHEN 'Murz' THEN 'https://www.instagram.com/7murzz?igsh=a245YWUyZzBldTNr'
    WHEN 'Díaz' THEN 'https://www.instagram.com/e.diazz11?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
    WHEN 'Malcolm' THEN 'https://www.instagram.com/_malckom_/'
    WHEN 'Samply' THEN 'https://www.instagram.com/____samply____?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
    WHEN 'Raigo' THEN 'https://www.instagram.com/'
    WHEN 'Cris' THEN 'https://www.instagram.com/'
    WHEN 'KZQ' THEN 'https://www.instagram.com/'
    WHEN 'Emebe' THEN 'https://www.instagram.com/'
    WHEN 'Kza' THEN 'https://www.instagram.com/yohan.kza'
    WHEN 'Zalazar' THEN 'https://www.instagram.com/'
    WHEN 'Candela' THEN 'https://www.instagram.com/'
    WHEN 'Mambo' THEN 'https://www.instagram.com/'
    WHEN 'Nemexiz' THEN 'https://www.instagram.com/'
    WHEN 'Enfasix' THEN 'https://www.instagram.com/'
    WHEN 'Arenik' THEN 'https://www.instagram.com/'
    WHEN 'Zinhiloz' THEN 'https://www.instagram.com/'
    WHEN 'Sonkey' THEN 'https://www.instagram.com/'
    WHEN 'Hostil' THEN 'https://www.instagram.com/'
    WHEN 'Zaku' THEN 'https://www.instagram.com/zaku_mz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
    WHEN 'Puma' THEN 'https://www.instagram.com/'
    WHEN 'Shoot' THEN 'https://www.instagram.com/'
    WHEN 'Leona' THEN 'https://www.instagram.com/'
    WHEN 'Sirius' THEN 'https://www.instagram.com/'
    WHEN 'Clezart' THEN 'https://www.instagram.com/'
    WHEN 'Syd' THEN 'https://www.instagram.com/'
    WHEN 'Chris Re' THEN 'https://www.instagram.com/'
    WHEN 'Tiago' THEN 'https://www.instagram.com/'
    WHEN 'Poeta de Marfil' THEN 'https://www.instagram.com/'
    WHEN 'Ds' THEN 'https://www.instagram.com/'
  END,
  CASE a.name
    WHEN 'Kza' THEN 'Liga Geométricas'
    WHEN 'Zaku' THEN 'TikTok'
    ELSE 'Instagram'
  END
FROM artists a
WHERE a.name IN (
  'Ray', 'ZER', 'Murz', 'Díaz', 'Malcolm', 'Samply', 'Raigo', 'Cris', 'KZQ', 'Emebe', 
  'Kza', 'Zalazar', 'Candela', 'Mambo', 'Nemexiz', 'Enfasix', 'Arenik', 'Zinhiloz', 
  'Sonkey', 'Hostil', 'Zaku', 'Puma', 'Shoot', 'Leona', 'Sirius', 'Clezart', 'Syd', 
  'Chris Re', 'Tiago', 'Poeta de Marfil', 'Ds'
);

-- Verify the insert
SELECT a.name as artist_name, s.platform, s.url, s.label
FROM artist_socials s
JOIN artists a ON s.artist_id = a.id
ORDER BY a.name, s.platform;