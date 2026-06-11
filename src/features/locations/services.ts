/**
 * Location Services
 * 
 * Provides methods to access location data from the database.
 * Currently supports countries with optional departments (Colombia) and cities.
 */

import { createClient } from '@/shared/api/supabaseServer';
import type { Country, Department, City, LocationCol, LocationSimple, Location } from '@/entities';

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
    return [];
  }
  
  return (data as DbCountry[]).map(c => ({
    id: c.id,
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
    return [];
  }
  
  return (data as DbDepartment[]).map(d => ({
    id: d.id,
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
    return [];
  }
  
  const { data, error } = await supabase
    .from('cities')
    .select('name')
    .eq('department_id', department.id)
    .order('name');
  
  if (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
  
  return (data as DbCity[]).map(c => ({
    id: c.id,
    name: c.name,
  }));
}

/**
 * Build full location string from components
 */
export function buildLocationString(location: Location): string {
  const parts: string[] = [];
  
  // Handle discriminated union types
  if (location.type === 'colombia' || location.type === 'simple') {
    if (location.city) {
      parts.push(location.city.name);
    }
    if (location.type === 'colombia' && location.department) {
      parts.push(location.department.name);
    }
    parts.push(location.country.name);
  } else if (location.type === 'country-only') {
    parts.push(location.country.name);
  }
  
  return parts.join(', ');
}

/**
 * Check if a country supports departments
 */
export async function countrySupportsDepartments(countryCode: string): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('countries')
    .select('has_departments')
    .eq('code', countryCode)
    .single();
  return data?.has_departments ?? false;
}

/**
 * Get all locations for a country (useful for dropdowns)
 */
export async function getLocationsForCountry(countryCode: string) {
  const locations: { departments: Department[]; cities: Record<string, City[]> } = {
    departments: [],
    cities: {},
  };
  
  if (await countrySupportsDepartments(countryCode)) {
    locations.departments = await getDepartments(countryCode);
    
    for (const dept of locations.departments) {
      locations.cities[dept.code] = await getCities(dept.code, countryCode);
    }
  }
  
  return locations;
}
