'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { artistService } from '@/services/artistService';
import { Artist } from '@/types/artists';

export async function createArtistAction(formData: FormData) {
  try {
    const rawBio = formData.get('bio') as string;
    const rawRoles = formData.get('orgRole') as string;
    const igUrl = formData.get('instagram') as string;
    const imageFile = formData.get('imageFile') as File;
    let imageUrl = '';

    // Si el usuario subió un archivo, lo subimos a Supabase Storage
    if (imageFile && imageFile.size > 0) {
      imageUrl = await artistService.uploadImage(imageFile);
    }

    const newArtist: Artist = {
      id: formData.get('id') as string,
      name: formData.get('name') as string,
      orgRole: rawRoles.split(',').map(r => r.trim()),
      image: imageUrl,
      imagePosition: formData.get('imagePosition') as string || '50%',
      profession: formData.get('profession') as string,
      origin: formData.get('origin') as string,
      trajectory: formData.get('trajectory') as string,
      bio: rawBio.split('\n').filter(p => p.trim() !== ''),
      socials: igUrl ? [{ platform: 'instagram', url: igUrl, label: 'Instagram' }] : []
    };

    await artistService.create(newArtist);
    
    revalidatePath('/');
    revalidatePath('/admin/artists');
  } catch (error: any) {
    return { error: error.message };
  }

  redirect('/admin/artists');
}

export async function updateArtistAction(id: string, formData: FormData) {
  try {
    const rawBio = formData.get('bio') as string;
    const rawRoles = formData.get('orgRole') as string;
    const igUrl = formData.get('instagram') as string;
    const imageFile = formData.get('imageFile') as File;
    let imageUrl = formData.get('currentImage') as string;

    // Solo subimos si hay un archivo nuevo
    if (imageFile && imageFile.size > 0) {
      imageUrl = await artistService.uploadImage(imageFile);
    }

    const updates: Partial<Artist> = {
      name: formData.get('name') as string,
      orgRole: rawRoles.split(',').map(r => r.trim()),
      image: imageUrl,
      imagePosition: formData.get('imagePosition') as string,
      profession: formData.get('profession') as string,
      origin: formData.get('origin') as string,
      trajectory: formData.get('trajectory') as string,
      bio: rawBio.split('\n').filter(p => p.trim() !== ''),
      socials: igUrl ? [{ platform: 'instagram', url: igUrl, label: 'Instagram' }] : []
    };

    await artistService.update(id, updates);
    
    revalidatePath('/');
    revalidatePath('/admin/artists');
    revalidatePath(`/admin/artists/edit/${id}`);
  } catch (error: any) {
    return { error: error.message };
  }

  redirect('/admin/artists');
}

export async function deleteArtistAction(id: string) {
  try {
    await artistService.delete(id);
    revalidatePath('/');
    revalidatePath('/admin/artists');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
