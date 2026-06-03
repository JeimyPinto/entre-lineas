-- BULK INSERT: Artists from artists.json
-- Run with: npx supabase db query --linked -f supabase/seed_artists_bulk.sql

-- First, clear existing artists (optional - remove if you want to keep existing)
-- DELETE FROM artists;

-- Bulk insert all artists from public/data/artists.json
INSERT INTO artists (name, org_role, image, image_position, profession, origin, trajectory, bio, socials) VALUES
('Galáctico', ARRAY['Fundador'], '/artists/galactico.webp', '50%', 'Abogado', 'Manizales, Colombia', 'Desde 2020', ARRAY['Artista originario de la ciudad de Manizales, cuya carrera artística comienza a partir del año 2020.', 'Enfocado en el desarrollo musical, lírico, artístico, pedagógico y profesional, e influenciado por la Cultura Hip-Hop, la Poesía y la Rítmica.', 'Convergiendo en el proyecto artístico que lo caracteriza.'], '[{"platform":"instagram","url":"https://www.instagram.com/_mr_galactico_","label":"Instagram"}]'::jsonb),
('Ray', ARRAY['Juez'], '/artists/ray.jpg', '50%', 'Productor y Artista', 'Manizales, Colombia', 'Desde 2018', ARRAY['Productor y artista destacado en R Studios, aportando su visión y talento a las instrumentales y a la escena urbana.'], '[{"platform":"instagram","url":"https://www.instagram.com/ray_oficialr","label":"Instagram"}]'::jsonb),
('ZER', ARRAY['Juez'], NULL, '50%', 'Juez', 'Manizales, Colombia', 'Desde 2019', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/zerlamortmamut?igsh=cmpiZ2Y1YW90YWk2","label":"Instagram"}]'::jsonb),
('Murz', ARRAY['Juez'], NULL, '50%', 'Juez', 'Manizales, Colombia', 'Desde 2019', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/7murzz?igsh=a245YWUyZzBldTNr","label":"Instagram"}]'::jsonb),
('Díaz', ARRAY['Juez'], '/artists/diaz.jpg', '50%', 'Juez', 'Manizales, Colombia', 'Desde 2019', ARRAY['Con un gran conocimiento sobre el hip hop y el freestyle, empieza su trayectoria como juez en 2020, siendo parte de la terna de jueces de los eventos más importantes realizados en la ciudad.'], '[{"platform":"instagram","url":"https://www.instagram.com/e.diazz11?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==","label":"Instagram"}]'::jsonb),
('Malcolm', ARRAY['Juez'], NULL, '50%', 'Artista y Tatuador', 'Manizales, Colombia', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/_malckom_/","label":"Instagram"}]'::jsonb),
('Samply', ARRAY['Juez'], '/artists/samply.jpg', '50%', 'Rapero, Productor y Gestor Cultural', 'Chinchiná, Colombia', 'Desde 2019', ARRAY['Artista de la ciudad de Chinchiná.', 'Sus aportaciones han sido como gestor cultural en la ciudad de Chinchiná, rapero y freestyler. También se enfoca en la producción musical, el rap y el arte en general.'], '[{"platform":"instagram","url":"https://www.instagram.com/____samply____?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==","label":"Instagram"}]'::jsonb),
('Raigo', ARRAY['Juez'], NULL, '50%', 'Juez', 'Manizales, Colombia', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/","label":"Instagram"}]'::jsonb),
('Cris', ARRAY['Juez'], NULL, '50%', 'Juez', 'Manizales, Colombia', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/","label":"Instagram"}]'::jsonb),
('KZQ', ARRAY['Juez'], NULL, '50%', 'Juez', 'Manizales, Colombia', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/","label":"Instagram"}]'::jsonb),
('Emebe', ARRAY['Juez'], NULL, '50%', 'Juez', 'Manizales, Colombia', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/","label":"Instagram"}]'::jsonb),
('Kza', ARRAY['Juez'], '/artists/kza.webp', '50%', 'Organizador y Juez', 'Medellín, Colombia', 'Desde 2019', ARRAY['Su compromiso con el fomento de la escena lo ha consolidado actualmente en su desempeño como organizador y juez.', 'Ante la carencia de plataformas competitivas en su entorno, fundó la liga Geométricas, un espacio dedicado a la prospección y formación de jóvenes talentos que buscan integrarse a la cultura del rap.', 'Asimismo, lidera la Copa del Aburr, una innovadora propuesta bajo el sello de Geométricas que busca unificar la escena mediante batallas interligas, marcando una nueva etapa de expansión y articulación para su organización.'], '[{"platform":"instagram","url":"https://www.instagram.com/yohan.kza","label":"Instagram"},{"platform":"instagram","url":"https://www.instagram.com/geometricas.hiphop?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==","label":"Liga Geométricas"}]'::jsonb),
('Zalazar', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/","label":"Instagram"}]'::jsonb),
('Candela', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/","label":"Instagram"}]'::jsonb),
('Mambo', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/","label":"Instagram"}]'::jsonb),
('Nemexiz', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/","label":"Instagram"}]'::jsonb),
('Enfasix', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/","label":"Instagram"}]'::jsonb),
('Arenik', ARRAY['Host'], NULL, '50%', 'Host', '', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/","label":"Instagram"}]'::jsonb),
('Zinhiloz', ARRAY['Host'], NULL, '50%', 'Host', '', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/","label":"Instagram"}]'::jsonb),
('Sonkey', ARRAY['Juez','Host'], NULL, '50%', 'Juez y Host', '', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/","label":"Instagram"}]'::jsonb),
('Hostil', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/","label":"Instagram"}]'::jsonb),
('Zaku', ARRAY['Juez'], '/artists/zaku.webp', '50%', 'Organizador y Rapero', 'Manizales, Colombia', 'Desde 2017', ARRAY['Se ha consolidado como un actor clave en la gestión cultural de la ciudad al ser uno de los pilares de la competencia La Fuente Del Under, donde lidera un equipo organizador enfocado en proyectar el talento local hacia una escala nacional.', 'Como competidor, ha dejado su huella en certámenes de renombre como Corta Bigote y Supremacía Mc. Su desempeño más destacado tuvo lugar en Maestro de las lomas, donde alcanzó el tercer puesto, asegurando así su clasificación a la fase nacional de este prestigioso torneo.', 'Actualmente, centra sus esfuerzos en institucionalizar y expandir el impacto de su organización, buscando elevar el reconocimiento de la cultura urbana regional en todo el país.'], '[{"platform":"instagram","url":"https://www.instagram.com/zaku_mz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==","label":"Instagram"},{"platform":"tiktok","url":"https://www.tiktok.com/@zaku_mc?is_from_webapp=1&sender_device=pc","label":"TikTok"}]'::jsonb),
('Puma', ARRAY['Host'], NULL, '50%', 'Host', '', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/","label":"Instagram"}]'::jsonb),
('Shoot', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/","label":"Instagram"}]'::jsonb),
('Leona', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/","label":"Instagram"}]'::jsonb),
('Sirius', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/","label":"Instagram"}]'::jsonb),
('Clezart', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/","label":"Instagram"}]'::jsonb),
('Syd', ARRAY['Host'], NULL, '50%', 'Host', '', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/","label":"Instagram"}]'::jsonb),
('Chris Re', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/","label":"Instagram"}]'::jsonb),
('Tiago', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/","label":"Instagram"}]'::jsonb),
('Poeta de Marfil', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/","label":"Instagram"}]'::jsonb),
('Ds', ARRAY['Juez'], NULL, '50%', 'Juez', '', '', ARRAY[''], '[{"platform":"instagram","url":"https://www.instagram.com/","label":"Instagram"}]'::jsonb)
ON CONFLICT DO NOTHING;

-- Verify the insert
SELECT id, name, org_role, profession, origin FROM artists ORDER BY id;
