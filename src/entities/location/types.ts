/**
 * Location Entity Types
 * 
 * Represents location hierarchies for artists and events.
 * Currently supports countries with optional department/state (Colombia only)
 * and city. Designed to be extensible for other countries.
 */

export interface Country {
  code: string;    // ISO 3166-1 alpha-2 code (e.g., 'CO', 'AR')
  name: string;    // Display name (e.g., 'Colombia')
}

export interface Department {
  code: string;    // Department code (e.g., 'ANT')
  name: string;    // Department name (e.g., 'Antioquia')
  countryCode: string; // Parent country code
}

export interface City {
  name: string;    // City name (e.g., 'Medellín')
  departmentCode?: string; // Optional parent department for Colombia
}

// Full location structure for Colombia (country + department + city)
export interface LocationCol {
  country: Country;
  department?: Department;
  city?: string;
}

// Simpler structure for other countries (country + city)
export interface LocationSimple {
  country: Country;
  city?: string;
}

// Union type for any location
export type Location = LocationCol | LocationSimple;

// Country codes that support departments/states (readonly tuple)
export const COUNTRIES_WITH_DEPARTMENTS = ['CO'] as const;
export type CountryWithDepartments = typeof COUNTRIES_WITH_DEPARTMENTS[number];

// Helper to check if location supports departments
export function hasDepartments(location: Location): location is LocationCol {
  return (COUNTRIES_WITH_DEPARTMENTS as readonly string[]).includes(location.country.code);
}
