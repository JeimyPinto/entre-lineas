'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { artistService } from '@/features/artists/services';
import { Artist, SocialLink } from '@/entities/artist/types';

export async function createArtistAction(formData: FormData) {
  try {
    const rawBio = formData.get('bio') as string;
    const rawRoles = formData.get('orgRole') as string;
    const imageFile = formData.get('imageFile') as File;
    let imageUrl = '';

    // Si el usuario subió un archivo, lo subimos a Supabase Storage
    if (imageFile && imageFile.size > 0) {
      imageUrl = await artistService.uploadImage(imageFile);
    }

    // Get socials from JSON
    let socials: SocialLink[] = [];
    const rawSocials = formData.get('socials') as string;
    if (rawSocials) {
      try {
        socials = JSON.parse(rawSocials);
      } catch {
        // Keep empty if parse fails
      }
    }

    const newArtist: Artist = {
      alias: formData.get('alias') as string,
      name: formData.get('name') as string,
      orgRole: rawRoles.split(',').map(r => r.trim()),
      image: imageUrl,
      imagePosition: formData.get('imagePosition') as string || '50%',
      profession: formData.get('profession') as string,
      origin: formData.get('origin') as string,
      trajectory: formData.get('trajectory') as string,
      bio: rawBio.split('\n').filter(p => p.trim() !== ''),
      socials
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
    const imageFile = formData.get('imageFile') as File;
    let imageUrl = formData.get('currentImage') as string;

    // Solo subimos si hay un archivo nuevo
    if (imageFile && imageFile.size > 0) {
      imageUrl = await artistService.uploadImage(imageFile);
    }

    // Get socials from JSON
    let socials: SocialLink[] = [];
    const rawSocials = formData.get('socials') as string;
    if (rawSocials) {
      try {
        socials = JSON.parse(rawSocials);
      } catch {
        socials = [];
      }
    }

    const updates: Partial<Artist> = {
      alias: formData.get('alias') as string,
      name: formData.get('name') as string,
      orgRole: rawRoles.split(',').map(r => r.trim()),
      image: imageUrl,
      imagePosition: formData.get('imagePosition') as string,
      profession: formData.get('profession') as string,
      origin: formData.get('origin') as string,
      trajectory: formData.get('trajectory') as string,
      bio: rawBio.split('\n').filter(p => p.trim() !== ''),
      socials
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
