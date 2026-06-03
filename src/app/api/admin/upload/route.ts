import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { artistService } from '@/features/artists/services';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const idParam = formData.get('id') as string;

    if (!file || !idParam) {
      return NextResponse.json({ error: 'Missing file or id' }, { status: 400 });
    }

    // Support both numeric IDs (legacy) and string UUIDs
    let id: string;
    const numericId = parseInt(idParam, 10);
    if (!isNaN(numericId)) {
      id = String(numericId);
    } else {
      id = idParam;
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Resize to 640x800 max (4:5 portrait), cover crop
    const processedImage = await sharp(buffer)
      .resize(640, 800, {
        fit: 'cover',
        position: 'top'
      })
      .webp({ quality: 90 })
      .toBuffer();

    // Save to public/artists/[id].webp
    const filename = `${id}.webp`;
    const filepath = path.join(process.cwd(), 'public', 'artists', filename);
    await writeFile(filepath, processedImage);

    // Update artist record in database
    const imagePath = `/artists/${filename}`;
    const updates = { image: imagePath };
    await artistService.update(id, updates);

    return NextResponse.json({ success: true, image: imagePath });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
