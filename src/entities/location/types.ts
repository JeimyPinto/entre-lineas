import { Identifiable, Named } from '../shared/base';

/**
 * Location Entity Types
 * 
 * Represents location hierarchies for artists and events.
 * Uses discriminated unions for type-safe location handling.
 * Currently supports Colombia (with departments) and simple country+city for other countries.
 */

// ============================================
// Base Location Interfaces
// ============================================

/** Base location entity with code and name */
export interface LocationEntity extends Identifiable, Named {
  code: string;  // ISO code or internal code
}

/** Country entity */
export interface Country extends LocationEntity {
  // ISO 3166-1 alpha-2 code (e.g., 'CO', 'AR')
  // name: Display name (e.g., 'Colombia')
}

/** Department/State entity (for countries with subdivisions) */
export interface Department extends LocationEntity {
  countryCode: string; // Parent country ISO code
}

/** City entity */
export interface City extends Omit<LocationEntity, 'code'> {
  departmentCode?: string; // Optional parent department code
  code?: string; // Optional code for cities
}

// ============================================
// Discriminated Union Location Types
// ============================================

/** Colombia location: Country + Department + City */
export interface LocationColombia {
  type: 'colombia';
  country: Country;
  department: Department;
  city: City;
}

/** Simple location: Country + City (for countries without departments) */
export interface LocationSimple {
  type: 'simple';
  country: Country;
  city: City;
}

/** Generic location with only country */
export interface LocationCountryOnly {
  type: 'country-only';
  country: Country;
}

/** Union of all location types */
export type Location = LocationColombia | LocationSimple | LocationCountryOnly;

// ============================================
// Type Guards & Helpers
// ============================================

/** Countries that support departments/states */
export const COUNTRIES_WITH_DEPARTMENTS = ['CO'] as const;
export type CountryWithDepartments = typeof COUNTRIES_WITH_DEPARTMENTS[number];

/** Check if a country supports departments */
export function countryHasDepartments(countryCode: string): countryCode is CountryWithDepartments {
  return (COUNTRIES_WITH_DEPARTMENTS as readonly string[]).includes(countryCode);
}

/** Type guard for Colombia location */
export function isLocationColombia(location: Location): location is LocationColombia {
  return location.type === 'colombia';
}

/** Type guard for simple location */
export function isLocationSimple(location: Location): location is LocationSimple {
  return location.type === 'simple';
}

/** Type guard for country-only location */
export function isLocationCountryOnly(location: Location): location is LocationCountryOnly {
  return location.type === 'country-only';
}

/** Get display string for location */
export function formatLocation(location: Location): string {
  switch (location.type) {
    case 'colombia':
      return `${location.city.name}, ${location.department.name}, ${location.country.name}`;
    case 'simple':
      return `${location.city.name}, ${location.country.name}`;
    case 'country-only':
      return location.country.name;
  }
}

/** Create a Colombia location */
export function createColombiaLocation(
  country: Country,
  department: Department,
  city: City
): LocationColombia {
  return { type: 'colombia', country, department, city };
}

/** Create a simple location */
export function createSimpleLocation(
  country: Country,
  city: City
): LocationSimple {
  return { type: 'simple', country, city };
}

/** Create a country-only location */
export function createCountryOnlyLocation(country: Country): LocationCountryOnly {
  return { type: 'country-only', country };
}

// ============================================
// Legacy Support (for backward compatibility)
// ============================================

/** @deprecated Use LocationColombia instead */
export interface LocationCol {
  country: Country;
  department?: Department;
  city?: string;
}

/** @deprecated Use LocationSimple instead */
export interface LocationSimpleLegacy {
  country: Country;
  city?: string;
}

/** @deprecated Use Location union type instead */
export type LocationLegacy = LocationCol | LocationSimpleLegacy;

/** @deprecated Use formatLocation() instead */
export function formatLocationLegacy(location: LocationLegacy): string {
  if ('department' in location && location.department) {
    return `${location.city}, ${location.department.name}, ${location.country.name}`;
  }
  if (location.city) {
    return `${location.city}, ${location.country.name}`;
  }
  return location.country.name;
}