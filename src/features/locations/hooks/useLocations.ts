/**
 * Hook for location data on the client side
 */

import { useState, useEffect, useCallback } from 'react';

export interface Country {
  code: string;
  name: string;
}

export interface Department {
  code: string;
  name: string;
  countryCode: string;
}

export interface City {
  name: string;
}

interface UseLocationsReturn {
  countries: Country[];
  departments: Department[];
  cities: City[];
  loading: boolean;
  error: string | null;
  selectedCountry: Country | null;
  selectedDepartment: Department | null;
  selectedCity: string;
  setSelectedCountry: (country: Country | null) => void;
  setSelectedDepartment: (department: Department | null) => void;
  setSelectedCity: (city: string) => void;
  locationString: string;
}

/**
 * Hook to manage location hierarchy (country -> department -> city)
 */
export function useLocations(): UseLocationsReturn {
  const [countries, setCountries] = useState<Country[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [selectedCity, setSelectedCity] = useState('');

  // Load countries on mount
  useEffect(() => {
    async function loadCountries() {
      try {
        const response = await fetch('/api/locations?action=countries');
        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
        } else {
          setCountries(data.countries || []);
        }
      } catch (err) {
        setError('Failed to load countries');
        console.error('Error loading countries:', err);
      } finally {
        setLoading(false);
      }
    }
    
    loadCountries();
  }, []);

  // Load departments when country changes
  useEffect(() => {
    async function loadDepartments() {
      if (!selectedCountry) {
        setDepartments([]);
        setCities([]);
        return;
      }
      
      try {
        const response = await fetch(`/api/locations?action=departments&country=${selectedCountry.code}`);
        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
        } else {
          setDepartments(data.departments || []);
        }
      } catch (err) {
        console.error('Error loading departments:', err);
      }
    }
    
    loadDepartments();
  }, [selectedCountry]);

  // Load cities when department changes
  useEffect(() => {
    async function loadCities() {
      if (!selectedCountry || !selectedDepartment) {
        setCities([]);
        return;
      }
      
      try {
        const response = await fetch(
          `/api/locations?action=cities&country=${selectedCountry.code}&department=${selectedDepartment.code}`
        );
        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
        } else {
          setCities(data.cities || []);
        }
      } catch (err) {
        console.error('Error loading cities:', err);
      }
    }
    
    loadCities();
  }, [selectedCountry, selectedDepartment]);

  // Build display string
  const locationString = [
    selectedCity,
    selectedDepartment?.name,
    selectedCountry?.name,
  ].filter(Boolean).join(', ');

  return {
    countries,
    departments,
    cities,
    loading,
    error,
    selectedCountry,
    selectedDepartment,
    selectedCity,
    setSelectedCountry,
    setSelectedDepartment,
    setSelectedCity,
    locationString,
  };
}
