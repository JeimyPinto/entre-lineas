# TODO - Location Database Implementation

## Summary
Implements location hierarchy in the database for artists and events, supporting countries with optional departments (Colombia) and cities. Designed to be extensible for other countries.

## Status: COMPLETE

### Files Created/Modified

- [x] `src/data/locations.ts` - Updated with ISO codes and fixed typos
- [x] `src/entities/location/types.ts` - New entity types
- [x] `prisma/schema.prisma` - Added Country, Department, City models
- [x] `supabase/migrations/20260425000000_location_hierarchy.sql` - SQL migration
- [x] `src/features/locations/services.ts` - Database services
- [x] `src/features/locations/api/route.ts` - API endpoint
- [x] `src/features/locations/hooks/useLocations.ts` - React hook for client

### Next Steps

1. **Run the migration in Supabase**:
   - Go to Supabase Dashboard → SQL Editor
   - Copy content from `supabase/migrations/20260425000000_location_hierarchy.sql`
   - Execute the SQL

2. **Update Prisma client**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Optional: Update Artist model** to reference location:
   - Add `countryCode`, `departmentCode`, `city` fields to Artist model
   - Or keep as a single `origin` string for now

### API Usage

```bash
# Get all countries
GET /api/locations?action=countries

# Get departments for Colombia
GET /api/locations?action=departments&country=CO

# Get cities for Antioquia
GET /api/locations?action=cities&country=CO&department=ANT

# Check if country supports departments
GET /api/locations?action=supports&country=CO
```

### React Hook Usage

```tsx
import { useLocations } from '@/features/locations/hooks/useLocations';

function LocationSelector() {
  const {
    countries,
    departments,
    cities,
    selectedCountry,
    selectedDepartment,
    selectedCity,
    setSelectedCountry,
    setSelectedDepartment,
    setSelectedCity,
    locationString,
  } = useLocations();

  // ... render form
}
