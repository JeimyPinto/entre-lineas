-- SEED DATA: CARGA INICIAL DE TALENTO

-- Clear existing artists first
DELETE FROM artists;

-- Carga de Galáctico como primer artista (único种子)
INSERT INTO artists (name, org_role, image, profession, origin, trajectory, bio, socials)
VALUES (
  'Galáctico', 
  ARRAY['Fundador'], 
  '/artists/galactico.webp', 
  'Abogado', 
  'Manizales, Colombia', 
  'Desde 2020', 
  ARRAY[
    'Artista originario de la ciudad de Manizales, cuya carrera artística comienza a partir del año 2020.',
    'Enfocado en el desarrollo musical, lírico, artístico, pedagógico y profesional, e influenciado por la Cultura Hip-Hop, la Poesía y la Rítmica.',
    'Convergiendo en el proyecto artístico que lo caracteriza.'
  ],
  '[{"platform":"instagram","url":"https://www.instagram.com/_mr_galactico_","label":"Instagram"}]'::jsonb
);
