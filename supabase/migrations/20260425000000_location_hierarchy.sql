-- Location Hierarchy Tables
-- Supports countries with departments (Colombia) and cities
-- Designed to be extensible for other countries in the future

-- Create enum for countries that support departments
DO $$ BEGIN
  CREATE TYPE country_support_level AS ENUM ('basic', 'departments');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Countries table
CREATE TABLE IF NOT EXISTS countries (
  id SERIAL PRIMARY KEY,
  code VARCHAR(2) NOT NULL UNIQUE, -- ISO 3166-1 alpha-2
  name VARCHAR(100) NOT NULL,
  has_departments BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE countries ENABLE ROW LEVEL SECURITY;

-- Departments table (only for countries that support them, like Colombia)
CREATE TABLE IF NOT EXISTS departments (
  id SERIAL PRIMARY KEY,
  code VARCHAR(5) NOT NULL, -- Department code (e.g., 'ANT', 'DC')
  name VARCHAR(100) NOT NULL,
  country_id INTEGER NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(code, country_id)
);

ALTER TABLE departments ENABLE ROW LEVEL SECURITY;

-- Cities table
CREATE TABLE IF NOT EXISTS cities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(name, department_id)
);

ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

-- Insert countries from data/locations.ts
INSERT INTO countries (code, name, has_departments) VALUES
  ('AR', 'Argentina', false),
  ('BO', 'Bolivia', false),
  ('BR', 'Brasil', false),
  ('CL', 'Chile', false),
  ('CO', 'Colombia', true), -- Only Colombia has departments for now
  ('CR', 'Costa Rica', false),
  ('CU', 'Cuba', false),
  ('EC', 'Ecuador', false),
  ('SV', 'El Salvador', false),
  ('ES', 'España', false),
  ('US', 'Estados Unidos', false),
  ('GT', 'Guatemala', false),
  ('HN', 'Honduras', false),
  ('MX', 'México', false),
  ('NI', 'Nicaragua', false),
  ('PA', 'Panamá', false),
  ('PY', 'Paraguay', false),
  ('PE', 'Perú', false),
  ('PR', 'Puerto Rico', false),
  ('DO', 'República Dominicana', false),
  ('UY', 'Uruguay', false),
  ('VE', 'Venezuela', false),
  ('OT', 'Otro', false)
ON CONFLICT (code) DO NOTHING;

-- Insert Colombia departments
INSERT INTO departments (code, name, country_id) VALUES
  ('AMA', 'Amazonas', (SELECT id FROM countries WHERE code = 'CO')),
  ('ANT', 'Antioquia', (SELECT id FROM countries WHERE code = 'CO')),
  ('ARA', 'Arauca', (SELECT id FROM countries WHERE code = 'CO')),
  ('ATL', 'Atlántico', (SELECT id FROM countries WHERE code = 'CO')),
  ('BOL', 'Bolívar', (SELECT id FROM countries WHERE code = 'CO')),
  ('BOY', 'Boyacá', (SELECT id FROM countries WHERE code = 'CO')),
  ('CAL', 'Caldas', (SELECT id FROM countries WHERE code = 'CO')),
  ('CAQ', 'Caquetá', (SELECT id FROM countries WHERE code = 'CO')),
  ('CAS', 'Casanare', (SELECT id FROM countries WHERE code = 'CO')),
  ('CAU', 'Cauca', (SELECT id FROM countries WHERE code = 'CO')),
  ('CES', 'Cesar', (SELECT id FROM countries WHERE code = 'CO')),
  ('CHO', 'Chocó', (SELECT id FROM countries WHERE code = 'CO')),
  ('COR', 'Córdoba', (SELECT id FROM countries WHERE code = 'CO')),
  ('CUN', 'Cundinamarca', (SELECT id FROM countries WHERE code = 'CO')),
  ('GUA', 'Guainía', (SELECT id FROM countries WHERE code = 'CO')),
  ('GUV', 'Guaviare', (SELECT id FROM countries WHERE code = 'CO')),
  ('HUI', 'Huila', (SELECT id FROM countries WHERE code = 'CO')),
  ('LAG', 'La Guajira', (SELECT id FROM countries WHERE code = 'CO')),
  ('MAG', 'Magdalena', (SELECT id FROM countries WHERE code = 'CO')),
  ('MET', 'Meta', (SELECT id FROM countries WHERE code = 'CO')),
  ('NAR', 'Nariño', (SELECT id FROM countries WHERE code = 'CO')),
  ('NSA', 'Norte de Santander', (SELECT id FROM countries WHERE code = 'CO')),
  ('PUT', 'Putumayo', (SELECT id FROM countries WHERE code = 'CO')),
  ('QUI', 'Quindío', (SELECT id FROM countries WHERE code = 'CO')),
  ('RIS', 'Risaralda', (SELECT id FROM countries WHERE code = 'CO')),
  ('SA', 'San Andrés', (SELECT id FROM countries WHERE code = 'CO')),
  ('SAN', 'Santander', (SELECT id FROM countries WHERE code = 'CO')),
  ('SUC', 'Sucre', (SELECT id FROM countries WHERE code = 'CO')),
  ('TOL', 'Tolima', (SELECT id FROM countries WHERE code = 'CO')),
  ('VAC', 'Valle del Cauca', (SELECT id FROM countries WHERE code = 'CO')),
  ('VAU', 'Vaupés', (SELECT id FROM countries WHERE code = 'CO')),
  ('VIC', 'Vichada', (SELECT id FROM countries WHERE code = 'CO'))
ON CONFLICT (code, country_id) DO NOTHING;

-- Insert cities for each department (using simple INSERT with UNNEST)
INSERT INTO cities (name, department_id) 
SELECT 'Leticia', id FROM departments WHERE code = 'AMA';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Medellín', 'Bello', 'Itagui', 'Envigado', 'Rionegro', 'Apartado', 'Turbo', 'Caucasia', 'Segovia']) AS city_name
WHERE d.code = 'ANT';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Arauca', 'Saravena', 'Tame']) AS city_name
WHERE d.code = 'ARA';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Barranquilla', 'Malambo', 'Soledad', 'Puerto Colombia', 'Galapa']) AS city_name
WHERE d.code = 'ATL';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Cartagena', 'Barranco', 'Loma', 'Carmen de Bolívar', 'Mompox']) AS city_name
WHERE d.code = 'BOL';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Tunja', 'Duitama', 'Sogamoso', 'Chiquinquirá', 'Paipa', 'Ramiriquí']) AS city_name
WHERE d.code = 'BOY';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Manizales', 'La Dorada', 'Villamaria', 'Chinchiná', 'Pensilvania']) AS city_name
WHERE d.code = 'CAL';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Florencia', 'San Vicente del Caguán', 'Belén', 'Cartagena del Chairá']) AS city_name
WHERE d.code = 'CAQ';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Yopal', 'Aguazul', 'Tauramena', 'Villanueva', 'Monterrey']) AS city_name
WHERE d.code = 'CAS';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Popayán', 'Santander de Quilichao', 'Caldono', 'El Patía']) AS city_name
WHERE d.code = 'CAU';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Valledupar', 'Aguachica', 'Bosconia', 'La Paz', 'Chimichagua']) AS city_name
WHERE d.code = 'CES';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Quibdó', 'Istmina', 'Condoto', 'Tadó', 'Acandí']) AS city_name
WHERE d.code = 'CHO';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Montería', 'Cereté', 'Lorica', 'Planeta Rica', 'Sahagún']) AS city_name
WHERE d.code = 'COR';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Zipaquirá', 'Facatativá', 'Girardot', 'Chía', 'Soacha', 'Cajicá', 'Madrid', 'Funza', 'Mosquera', 'Tabio']) AS city_name
WHERE d.code = 'CUN';

INSERT INTO cities (name, department_id) 
SELECT 'Inírida', id FROM departments WHERE code = 'GUA';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['San José del Guaviare', 'Miraflores', 'Calamo']) AS city_name
WHERE d.code = 'GUV';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Neiva', 'Pitalito', 'Garzón', 'Campoalegre', 'La Plata']) AS city_name
WHERE d.code = 'HUI';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Riohacha', 'Maicao', 'Uribia', 'Albania', 'Fonseca']) AS city_name
WHERE d.code = 'LAG';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Santa Marta', 'Ciénaga', 'El Banco', 'Plato', 'Fundación']) AS city_name
WHERE d.code = 'MAG';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Villavicencio', 'Granada', 'San Martín', 'Acacías', 'Puerto López']) AS city_name
WHERE d.code = 'MET';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Pasto', 'Ipiales', 'Tumaco', 'PMall', 'La Cruz']) AS city_name
WHERE d.code = 'NAR';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Cúcuta', 'Ocaña', 'Pamplona', 'Villa del Rosario', 'Bucarasica']) AS city_name
WHERE d.code = 'NSA';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Mocoa', 'Puerto Asís', 'San Francisco', 'Orito']) AS city_name
WHERE d.code = 'PUT';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Armenia', 'Calarcá', 'La Tebaida', 'Montenegro', 'Quimbaya']) AS city_name
WHERE d.code = 'QUI';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Pereira', 'Dosquebradas', 'Santa Rosa de Cabal', 'La Virginia', 'Marsella']) AS city_name
WHERE d.code = 'RIS';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['San Andrés', 'Providencia']) AS city_name
WHERE d.code = 'SA';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Bucaramanga', 'Floridablanca', 'Girón', 'Piedecuesta', 'Barichara', 'San Gil']) AS city_name
WHERE d.code = 'SAN';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Sincelejo', 'Corozal', 'Sampués', 'Coveñas', 'San Benito Abad']) AS city_name
WHERE d.code = 'SUC';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Ibagué', 'Espinal', 'Honda', 'Melgar', 'Chaparral']) AS city_name
WHERE d.code = 'TOL';

INSERT INTO cities (name, department_id) 
SELECT city_name, d.id FROM departments d 
CROSS JOIN unnest(ARRAY['Cali', 'Buenaventura', 'Palmira', 'Tulúa', 'Buga', 'Jamundí']) AS city_name
WHERE d.code = 'VAC';

INSERT INTO cities (name, department_id) 
SELECT 'Mitú', id FROM departments WHERE code = 'VAU';

INSERT INTO cities (name, department_id) 
SELECT 'Puerto Carreño', id FROM departments WHERE code = 'VIC';

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_departments_country ON departments(country_id);
CREATE INDEX IF NOT EXISTS idx_cities_department ON cities(department_id);
CREATE INDEX IF NOT EXISTS idx_cities_name ON cities(name);

-- Enable RLS
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

-- RLS Policies (allow public read access)
DROP POLICY IF EXISTS "Public read countries" ON countries;
CREATE POLICY "Public read countries" ON countries FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read departments" ON departments;
CREATE POLICY "Public read departments" ON departments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read cities" ON cities;
CREATE POLICY "Public read cities" ON cities FOR SELECT USING (true);
