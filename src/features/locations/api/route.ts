import { NextRequest, NextResponse } from 'next/server';
import { getCountries, getDepartments, getCities, countrySupportsDepartments } from '../services';

/**
 * API Route for location data
 * 
 * GET /api/locations
 *   - ?action=countries -> Get all countries
 *   - ?action=departments&country=CO -> Get departments for a country
 *   - ?action=cities&country=CO&department=ANT -> Get cities for a department
 *   - ?action=supports&country=CO -> Check if country supports departments
 */

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const country = searchParams.get('country');
  const department = searchParams.get('department');

  try {
    switch (action) {
      case 'countries': {
        const countries = await getCountries();
        return NextResponse.json({ countries });
      }

      case 'departments': {
        if (!country) {
          return NextResponse.json(
            { error: 'Country code required' },
            { status: 400 }
          );
        }
        const departments = await getDepartments(country);
        return NextResponse.json({ departments });
      }

      case 'cities': {
        if (!department || !country) {
          return NextResponse.json(
            { error: 'Department and country codes required' },
            { status: 400 }
          );
        }
        const cities = await getCities(department, country);
        return NextResponse.json({ cities });
      }

      case 'supports': {
        if (!country) {
          return NextResponse.json(
            { error: 'Country code required' },
            { status: 400 }
          );
        }
        const supports = countrySupportsDepartments(country);
        return NextResponse.json({ supports });
      }

      default: {
        // Return all countries by default
        const countries = await getCountries();
        return NextResponse.json({ countries });
      }
    }
  } catch (error) {
    console.error('Locations API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
