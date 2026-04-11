# Fix Hydration Mismatch in InstagramCard

## Steps:
- [x] 1. Create src/data/staticArtists.ts with static artists data from public/data/artists.json
- [x] 2. Update src/components/ui/InstagramCard.tsx: 
  - Import staticArtists from '@/data/staticArtists'
  - Remove async IIFE and artistsDataCache
  - Replace artistInfo lookup with staticArtists.find(a => a.id === judge.artistId)
  - Update for both judges and hosts maps
Task completed successfully. Hydration error fixed. See README or console for details.

