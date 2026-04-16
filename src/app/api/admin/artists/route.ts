import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { staticArtists, getArtistsData } from '@/data/artists';

export async function GET() {
  try {
    const data = await getArtistsData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newArtist = await request.json();
    const currentArtists = await getArtistsData();
    
    // validate ID uniqueness
    if (currentArtists.some(a => a.id === newArtist.id)) {
      return NextResponse.json({ error: 'ID already exists' }, { status: 400 });
    }
    
    currentArtists.push(newArtist);
    await saveArtists(currentArtists);
    
    return NextResponse.json({ success: true, artist: newArtist });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedArtist = await request.json();
    const currentArtists = await getArtistsData();
    
    const index = currentArtists.findIndex(a => a.id === updatedArtist.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 });
    }
    
    currentArtists[index] = updatedArtist;
    await saveArtists(currentArtists);
    
    return NextResponse.json({ success: true, artist: updatedArtist });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }
    
    const currentArtists = await getArtistsData();
    const filteredArtists = currentArtists.filter(a => a.id !== id);
    
    if (currentArtists.length === filteredArtists.length) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 });
    }
    
    await saveArtists(filteredArtists);
    
    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}

async function saveArtists(artists: any[]) {
  // Try to write to public JSON for live updates if it exists
  try {
    const jsonPath = path.join(process.cwd(), 'public', 'data', 'artists.json');
    await writeFile(jsonPath, JSON.stringify(artists, null, 2));
  } catch (e) {
    console.log("Could not write to JSON, might not exist yet.");
  }
  
  // Write to src/data/artists.ts
  const tsContent = `import { Artist } from '@/types/artists';

export const staticArtists: Artist[] = ${JSON.stringify(artists, null, 2)};

export const artistsDataFile = '/data/artists.json';

export async function getArtistsData(): Promise<Artist[]> {
  try {
    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    
    if (typeof window !== 'undefined') {
      const res = await fetch('/data/artists.json', { cache: 'no-store' });
      if (res.ok) return await res.json();
      return staticArtists;
    }

    if (!baseUrl) {
      if (process.env.NODE_ENV === 'development') {
        baseUrl = 'http://localhost:3000';
      } else {
        return staticArtists;
      }
    }

    const fetchUrl = new URL(artistsDataFile, baseUrl).toString();
    const res = await fetch(fetchUrl, { cache: 'no-store' });
    
    if (!res.ok) {
      console.warn('Fetch artists failed, using static fallback:', res.status);
      return staticArtists;
    }
    
    return await res.json() as Artist[];
  } catch (error) {
    console.error('Error loading artists data:', error);
    return staticArtists;
  }
}
`;
  
  const tsPath = path.join(process.cwd(), 'src', 'data', 'artists.ts');
  await writeFile(tsPath, tsContent);
}
