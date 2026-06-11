'use client';

import { useState } from 'react';
import styles from './Input.module.css';

const COMMON_COUNTRIES = [
  { code: 'AR', name: 'Argentina' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BR', name: 'Brasil' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colombia' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'CU', name: 'Cuba' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'ES', name: 'España' },
  { code: 'US', name: 'Estados Unidos' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'HN', name: 'Honduras' },
  { code: 'MX', name: 'México' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'PA', name: 'Panamá' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Perú' },
  { code: 'PR', name: 'Puerto Rico' },
  { code: 'DO', name: 'República Dominicana' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'OT', name: 'Otro' }
];

const COLOMBIA_DATA: Record<string, string[]> = {
  'Amazonas': ['Leticia'],
  'Antioquia': ['Medellín', 'Bello', 'Itagui', 'Envigado', 'Rionegro', 'Apartado', 'Turbo', 'Caucasia', 'Segovia'],
  'Arauca': ['Arauca', 'Saravena', 'Tame'],
  'Atlántico': ['Barranquilla', 'Malambo', 'Soledad', 'Puerto Colombia', 'Galapa'],
  'Bolívar': ['Cartagena', 'Barranco', 'Loma', 'Carmen de Bolívar', 'Mompox'],
  'Boyacá': ['Tunja', 'Duitama', 'Sogamoso', 'Chiquinquirá', 'Paipa', 'Ramiriquí'],
  'Caldas': ['Manizales', 'La Dorada', 'Villamaria', 'Chinchiná', 'Pensilvania'],
  'Caquetá': ['Florencia', 'San Vicente del Caguán', 'Belén', 'Cartagena del Chairá'],
  'Casanare': ['Yopal', 'Aguazul', 'Tauramena', 'Villanueva', 'Monterrey'],
  'Cauca': ['Popayán', 'Santander de Quilichao', 'Caldono', 'El Patía'],
  'Cesar': ['Valledupar', 'Aguachica', 'Bosconia', 'La Paz', 'Chimichagua'],
  'Chocó': ['Quibdó', 'Istmina', 'Condoto', 'Tadó', 'Acandí'],
  'Córdoba': ['Montería', 'Cereté', 'Lorica', 'Planeta Rica', 'Sahagún'],
  'Cundinamarca': ['Zipaquirá', 'Facatativá', 'Girardot', 'Chía', 'Soacha', 'Cajicá', 'Madrid', 'Funza', 'Mosquera', 'Tabio'],
  'Guainía': ['Inírida'],
  'Guaviare': ['San José del Guaviare', 'Miraflores', 'Calamo'],
  'Huila': ['Neiva', 'Pitalito', 'Garzón', 'Campoalegre', 'La Plata'],
  'La Guajira': ['Riohacha', 'Maicao', 'Uribia', 'Albania', 'Fonseca'],
  'Magdalena': ['Santa Marta', 'Ciénaga', 'El Banco', 'Plato', 'Fundación'],
  'Meta': ['Villavicencio', 'Granada', 'San Martín', 'Acacías', 'Puerto López'],
  'Nariño': ['Pasto', 'Ipiales', 'Tumaco', 'PMall', 'La Cruz'],
  'Norte de Santander': ['Cúcuta', 'Ocaña', 'Pamplona', 'Villa del Rosario', 'Bucarasica'],
  'Putumayo': ['Mocoa', 'Puerto Asís', 'San Francisco', 'Orito'],
  'Quindío': ['Armenia', 'Calarcá', 'La Tebaida', 'Montenegro', 'Quimbaya'],
  'Risaralda': ['Pereira', 'Dosquebradas', 'Santa Rosa de Cabal', 'La Virginia', 'Marsella'],
  'San Andrés': ['San Andrés', 'Providencia'],
  'Santander': ['Bucaramanga', 'Floridablanca', 'Girón', 'Piedecuesta', 'Barichara', 'San Gil'],
  'Sucre': ['Sincelejo', 'Corozal', 'Sampués', 'Coveñas', 'San Benito Abad'],
  'Tolima': ['Ibagué', 'Espinal', 'Honda', 'Melgar', 'Chaparral'],
  'Valle del Cauca': ['Cali', 'Buenaventura', 'Palmira', 'Tulúa', 'Buga', 'Jamundí'],
  'Vaupés': ['Mitú'],
  'Vichada': ['Puerto Carreño']
};

interface LocationSelectorProps {
  label: string;
  name: string;
  defaultValue?: string;
}

export default function LocationSelector({ label, name, defaultValue = '' }: LocationSelectorProps) {
  const countryNames = COMMON_COUNTRIES.map(c => c.name);
  
  const [country, setCountry] = useState<string>(() => {
    if (!defaultValue) return '';
    if (defaultValue.includes('Colombia')) return 'Colombia';
    if (countryNames.includes(defaultValue)) return defaultValue;
    return 'Otro';
  });

  const [customCountry, setCustomCountry] = useState<string>(() => {
    if (!defaultValue) return '';
    if (!defaultValue.includes('Colombia') && !countryNames.includes(defaultValue)) return defaultValue;
    return '';
  });

  const [department, setDepartment] = useState<string>(() => {
    if (defaultValue && defaultValue.includes('Colombia')) {
      const parts = defaultValue.split(',');
      if (parts.length >= 2) return parts[1].trim();
    }
    return '';
  });

  const [city, setCity] = useState<string>(() => {
    if (defaultValue && defaultValue.includes('Colombia')) {
      const parts = defaultValue.split(',');
      return parts[0].trim();
    }
    return '';
  });

  const finalValue = country === 'Colombia' 
    ? (city && department ? `${city},${department},Colombia` : 'Colombia')
    : country === 'Otro' ? customCountry : country;

  const departmentOptions = Object.keys(COLOMBIA_DATA).sort();
  const cityOptions = department && COLOMBIA_DATA[department] ? COLOMBIA_DATA[department].sort() : [];

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>{label}</label>
      <div style={{ display: 'flex', gap: 'var(--gap-l)', flexWrap: 'wrap' }}>
        <select 
          className={styles.input} 
          style={{ flex: 1, minWidth: '150px', backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }}
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setDepartment('');
            setCity('');
          }}
          required
        >
<option value="" disabled style={{ background: '#000', color: '#fff' }}>-- Seleccionar País --</option>
          {COMMON_COUNTRIES.map(c => (
            <option key={c.name} value={c.name} style={{ background: '#000', color: '#fff' }}>{c.name}</option>
          ))}
        </select>

        {country === 'Otro' && (
          <input 
            type="text"
            className={styles.input}
            placeholder="Especificar País o Región"
            style={{ flex: 1, minWidth: '150px' }}
            value={customCountry}
            onChange={(e) => setCustomCountry(e.target.value)}
            required
          />
        )}

        {country === 'Colombia' && (
          <>
            <select 
              className={styles.input} 
              style={{ flex: 1, minWidth: '150px', backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }}
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setCity('');
              }}
              required
            >
              <option value="" disabled style={{ background: '#000', color: '#fff' }}>-- Departamento --</option>
              {departmentOptions.map(dep => (
                <option key={dep} value={dep} style={{ background: '#000', color: '#fff' }}>{dep}</option>
              ))}
            </select>

            {department && (
              <select 
                className={styles.input} 
                style={{ flex: 1, minWidth: '150px', backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              >
                <option value="" disabled style={{ background: '#000', color: '#fff' }}>-- Ciudad --</option>
                {cityOptions.map(c => (
                  <option key={c} value={c} style={{ background: '#000', color: '#fff' }}>{c}</option>
                ))}
              </select>
            )}
          </>
        )}
      </div>
      <input type="hidden" name={name} value={finalValue} />
    </div>
  );
}
