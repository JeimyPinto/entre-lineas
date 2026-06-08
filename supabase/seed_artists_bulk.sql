-- BULK INSERT: Artists from artists.json
-- Run with: npx supabase db query --linked -f supabase/seed_artists_bulk.sql

-- Clear existing artists first
DELETE FROM artists;

-- Bulk insert all artists from public/data/artists.json (Galáctico ya está en seed.sql, se omite aquí)
INSERT INTO artists (name, org_role, image, image_position, profession, origin, trajectory, bio) VALUES
('Ray', ARRAY['Juez'], '/artists/ray.jpg', '50%', 'Productor y Artista', 'Manizales, Colombia', 'Desde 2018', ARRAY['Productor y artista destacado en R Studios, aportando su visión y talento a las instrumentales y a la escena urbana.']),
('ZER', ARRAY['Juez'], NULL, '50%', 'Juez', 'Manizales, Colombia', 'Desde 2019', ARRAY['']),
('Murz', ARRAY['Juez'], NULL, '50%', 'Juez', 'Manizales, Colombia', 'Desde 2019', ARRAY['']),
('Díaz', ARRAY['Juez'], '/artists/diaz.jpg', '50%', 'Juez', 'Manizales, Colombia', 'Desde 2019', ARRAY['Con un gran conocimiento sobre el hip hop y el freestyle, empieza su trayectoria como juez en 2020, siendo parte de la terna de jueces de los eventos más importantes realizados en la ciudad.']),
('Malcolm', ARRAY['Juez'], NULL, '50%', 'Artista y Tatuador', 'Manizales, Colombia', '', ARRAY['']),
('Samply', ARRAY['Juez'], '/artists/samply.jpg', '50%', 'Rapero, Productor y Gestor Cultural', 'Chinchiná, Colombia', 'Desde 2019', ARRAY['Artista de la ciudad de Chinchiná.', 'Sus aportaciones han sido como gestor cultural en la ciudad de Chinchiná, rapero y freestyler. También se enfoca en la producción musical, el rap y el arte en general.']),
('Raigo', ARRAY['Juez'], NULL, '50%', 'Juez', 'Manizales, Colombia', '', ARRAY['']),
('Cris', ARRAY['Juez'], NULL, '50%', 'Juez', 'Manizales, Colombia', '', ARRAY['']),
('KZQ', ARRAY['Juez'], NULL, '50%', 'Juez', 'Manizales, Colombia', '', ARRAY['']),
('Emebe', ARRAY['Juez'], NULL, '50%', 'Juez', 'Manizales, Colombia', '', ARRAY['']),
('Kza', ARRAY['Juez'], '/artists/kza.webp', '50%', 'Organizador y Juez', 'Medellín, Colombia', 'Desde 2019', ARRAY['Su compromiso con el fomento de la escena lo ha consolidado actualmente en su desempeño como organizador y juez.', 'Ante la carencia de plataformas competitivas en su entorno, fundó la liga Geométricas, un espacio dedicado a la prospección y formación de jóvenes talentos que buscan integrarse a la cultura del rap.', 'Asimismo, lidera la Copa del Aburr, una innovadora propuesta bajo el sello de Geométricas que busca unificar la escena mediante batallas interligas, marcando una nueva etapa de expansión y articulación para su organización.']),
('Zalazar', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY['']),
('Candela', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY['']),
('Mambo', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY['']),
('Nemexiz', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY['']),
('Enfasix', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY['']),
('Arenik', ARRAY['Host'], NULL, '50%', 'Host', '', '', ARRAY['']),
('Zinhiloz', ARRAY['Host'], NULL, '50%', 'Host', '', '', ARRAY['']),
('Sonkey', ARRAY['Juez','Host'], NULL, '50%', 'Juez y Host', '', '', ARRAY['']),
('Hostil', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY['']),
('Zaku', ARRAY['Juez'], '/artists/zaku.webp', '50%', 'Organizador y Rapero', 'Manizales, Colombia', 'Desde 2017', ARRAY['Se ha consolidado como un actor clave en la gestión cultural de la ciudad al ser uno de los pilares de la competencia La Fuente Del Under, donde lidera un equipo organizador enfocado en proyectar el talento local hacia una escala nacional.', 'Como competidor, ha dejado su huella en certámenes de renombre como Corta Bigote y Supremacía Mc. Su desempeño más destacado tuvo lugar en Maestro de las lomas, donde alcanzó el tercer puesto, asegurando así su clasificación a la fase nacional de este prestigioso torneo.', 'Actualmente, centra sus esfuerzos en institucionalizar y expandir el impacto de su organización, buscando elevar el reconocimiento de la cultura urbana regional en todo el país.']),
('Puma', ARRAY['Host'], NULL, '50%', 'Host', '', '', ARRAY['']),
('Shoot', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY['']),
('Leona', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY['']),
('Sirius', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY['']),
('Clezart', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY['']),
('Syd', ARRAY['Host'], NULL, '50%', 'Host', '', '', ARRAY['']),
('Chris Re', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY['']),
('Tiago', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY['']),
('Poeta de Marfil', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY['']),
('Ds', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY[''])
ON CONFLICT DO NOTHING;

-- Verify the insert
SELECT id, name, org_role, profession, origin FROM artists ORDER BY id;