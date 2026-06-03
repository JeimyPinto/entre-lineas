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

export async function POST(request: NextRequest) {
  try {
    const newArtist = await request.json();
    const artist = await artistService.create(newArtist);
    return NextResponse.json({ success: true, artist });
  } catch (error) {
    console.error('Error creating artist:', error);
    return NextResponse.json({ error: 'Failed to create artist' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedArtist = await request.json();
    if (!updatedArtist.id) {
      return NextResponse.json({ error: 'Artist ID is required' }, { status: 400 });
    }
    const artist = await artistService.update(updatedArtist.id, updatedArtist);
    return NextResponse.json({ success: true, artist });
  } catch (error) {
    console.error('Error updating artist:', error);
    return NextResponse.json({ error: 'Failed to update artist' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }
    
    await artistService.delete(id);
    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    console.error('Error deleting artist:', error);
    return NextResponse.json({ error: 'Failed to delete artist' }, { status: 500 });
  }
}
