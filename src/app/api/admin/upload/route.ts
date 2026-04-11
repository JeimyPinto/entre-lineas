import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { getArtistsData } from '@/data/artists';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const id = formData.get('id') as string;

    if (!file || !id) {
      return NextResponse.json({ error: 'Missing file or id' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Resize to 640x800 max (4:5 portrait), cover crop
    const processedImage = await sharp(buffer)
      .resize(640, 800, {
        fit: 'cover',
        position: 'top' // Prioritize face
      })
      .webp({ quality: 90 })
      .toBuffer();

    // Save to public/artists/[id].webp
    const filename = `${id}.webp`;
    const filepath = path.join(process.cwd(), 'public', 'artists', filename);
    await writeFile(filepath, processedImage);

    // Update JSON
    const artists = await getArtistsData();
    const artistIndex = artists.findIndex(a => a.id === id);
    if (artistIndex !== -1) {
      artists[artistIndex].image = `/artists/${filename}`;
      // Write back to JSON (simple for demo, use DB in prod)
      const jsonPath = path.join(process.cwd(), 'public', 'data', 'artists.json');
      await writeFile(jsonPath, JSON.stringify(artists, null, 2));
    }

    return NextResponse.json({ success: true, image: `/artists/${filename}` });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
