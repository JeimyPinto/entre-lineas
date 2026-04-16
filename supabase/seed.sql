-- SEED DATA: CARGA INICIAL DE TALENTO

-- Carga de Galáctico como primer artista
INSERT INTO artists (name, org_role, image, profession, origin, trajectory, bio, socials)
VALUES (
  'Galáctico', 
  ARRAY['Fundador'], 
  'https://paywsuxfzsoeunettwuj.supabase.co/storage/v1/object/public/artists/galactico.jpg', 
  'Abogado', 
  'Manizales, Colombia', 
  'Desde 2020', 
  ARRAY[
    'Enfocado en el desarrollo musical, lírico, artístico, pedagógico y profesional, e influenciado por la Cultura Hip-Hop, la Poesía y la Rítmica.',
    'Convergiendo en el proyecto artístico que lo caracteriza.'
  ],
  '[{"platform":"instagram","url":"https://www.instagram.com/_mr_galactico_","label":"Instagram"}]'::jsonb
);
