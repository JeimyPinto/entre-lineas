/**
 * Location Services
 * 
 * Provides methods to access location data from the database.
 * Currently supports countries with optional departments (Colombia) and cities.
 */

import { createClient } from '@/shared/api/supabaseServer';
import { COLOMBIA_DATA, COMMON_COUNTRIES, COUNTRIES_WITH_DEPARTMENTS } from '@/data/locations';
import type { Country, Department, City, LocationCol, LocationSimple, Location } from '@/entities/location/types';

// Database types (from Prisma)
interface DbCountry {
  id: number;
  code: string;
  name: string;
  has_departments: boolean;
  created_at: string;
}

interface DbDepartment {
  id: number;
  code: string;
  name: string;
  country_id: number;
  created_at: string;
}

interface DbCity {
  id: number;
  name: string;
  department_id: number;
  created_at: string;
}

/**
 * Get all countries
 */
export async function getCountries(): Promise<Country[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('countries')
    .select('code, name, has_departments')
    .order('name');
  
  if (error) {
    console.error('Error fetching countries:', error);
    // Fallback to static data if DB fails
    return COMMON_COUNTRIES.map(c => ({ code: c.code, name: c.name }));
  }
  
  return (data as DbCountry[]).map(c => ({
    code: c.code,
    name: c.name,
  }));
}

/**
 * Get departments for a country
 */
export async function getDepartments(countryCode: string): Promise<Department[]> {
  const supabase = await createClient();
  
  // First get country ID
  const { data: country } = await supabase
    .from('countries')
    .select('id')
    .eq('code', countryCode)
    .single();
  
  if (!country) {
    return [];
  }
  
  const { data, error } = await supabase
    .from('departments')
    .select('code, name')
    .eq('country_id', country.id)
    .order('name');
  
  if (error) {
    console.error('Error fetching departments:', error);
    // Fallback for Colombia
    if (countryCode === 'CO') {
      return Object.keys(COLOMBIA_DATA).map(name => ({
        code: name.substring(0, 3).toUpperCase(),
        name,
        countryCode,
      }));
    }
    return [];
  }
  
  return (data as DbDepartment[]).map(d => ({
    code: d.code,
    name: d.name,
    countryCode,
  }));
}

/**
 * Get cities for a department
 */
export async function getCities(departmentCode: string, countryCode: string = 'CO'): Promise<City[]> {
  const supabase = await createClient();
  
  // First get department ID
  const { data: department } = await supabase
    .from('departments')
    .select('id')
    .eq('code', departmentCode)
    .single();
  
  if (!department) {
    // Fallback for Colombia
    if (countryCode === 'CO' && COLOMBIA_DATA[departmentCode]) {
      return COLOMBIA_DATA[departmentCode].map(name => ({ name }));
    }
    return [];
  }
  
  const { data, error } = await supabase
    .from('cities')
    .select('name')
    .eq('department_id', department.id)
    .order('name');
  
  if (error) {
    console.error('Error fetching cities:', error);
    // Fallback for Colombia
    if (countryCode === 'CO' && COLOMBIA_DATA[departmentCode]) {
      return COLOMBIA_DATA[departmentCode].map(name => ({ name }));
    }
    return [];
  }
  
  return (data as DbCity[]).map(c => ({ name: c.name }));
}

/**
 * Build full location string from components
 */
export function buildLocationString(location: Location): string {
  const parts: string[] = [];
  
  if (location.city) {
    parts.push(location.city);
  }
  
  if ('department' in location && location.department) {
    parts.push(location.department.name);
  }
  
  parts.push(location.country.name);
  
  return parts.join(', ');
}

/**
 * Check if a country supports departments
 */
export function countrySupportsDepartments(countryCode: string): boolean {
  return COUNTRIES_WITH_DEPARTMENTS.includes(countryCode);
}

/**
 * Get all locations for a country (useful for dropdowns)
 */
export async function getLocationsForCountry(countryCode: string) {
  const locations: { departments: Department[]; cities: Record<string, City[]> } = {
    departments: [],
    cities: {},
  };
  
  if (countrySupportsDepartments(countryCode)) {
    locations.departments = await getDepartments(countryCode);
    
    for (const dept of locations.departments) {
      locations.cities[dept.code] = await getCities(dept.code, countryCode);
    }
  }
  
  return locations;
}
