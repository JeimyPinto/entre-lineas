import { NextRequest, NextResponse } from 'next/server';
import { artistService } from '@/features/artists/services';

export async function GET() {
  try {
    const artists = await artistService.getAll();
    return NextResponse.json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
    return NextResponse.json({ error: 'Failed to fetch artists' }, { status: 500 });
  }
}
