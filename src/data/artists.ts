import { Artist } from '@/types/artists';

export const artistsDataFile = '/data/artists.json';

export async function getArtistsData(): Promise<Artist[]> {
  const res = await fetch(new URL(artistsDataFile, process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000').toString(), { 
    cache: 'no-store' 
  });
  if (!res.ok) throw new Error('Failed to fetch artists');
  return res.json() as Promise<Artist[]>;
}
