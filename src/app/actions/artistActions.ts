'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { artistService } from '@/features/artists/services';
import { Artist, SocialLink } from '@/entities/artist/types';
import { safeString, safeStringArray, validateArtist } from '@/entities/artist/schema';

/**
 * Limpia y normaliza datos del formulario
 */
function sanitizeFormData(formData: FormData) {
  const rawBio = formData.get('bio') as string | null;
  const rawRoles = formData.get('orgRole') as string | null;
  
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

  // Filter empty socials
  const validSocials = socials.filter((s) => s.url && s.url.trim() !== '');
  
  // Get current image
  const currentImage = formData.get('currentImage') as string;
  const imageFile = formData.get('imageFile') as File;

  return {
    alias: formData.get('alias') as string || '',
    name: formData.get('name') as string || '',
    orgRole: rawRoles ? rawRoles.split(',').map((r) => r.trim()).filter(Boolean) : [],
    image: currentImage || '',
    imagePosition: (formData.get('imagePosition') as string) || '50%',
    profession: (formData.get('profession') as string) || '',
    origin: (formData.get('origin') as string) || '',
    trajectory: (formData.get('trajectory') as string) || '',
    bio: rawBio ? rawBio.split('\n').filter((p) => p.trim() !== '') : [],
    socials: validSocials,
    imageFile,
  };
}

/**
 * Construye el objeto Artist para crear/actualizar
 */
function buildArtistData(data: ReturnType<typeof sanitizeFormData>, imageUrl: string): Artist {
  return {
    alias: data.alias,
    name: data.name,
    orgRole: data.orgRole,
    image: imageUrl,
    imagePosition: data.imagePosition,
    profession: data.profession,
    origin: data.origin,
    trajectory: data.trajectory,
    bio: data.bio,
    socials: data.socials,
  };
}

export async function createArtistAction(formData: FormData) {
  try {
    const data = sanitizeFormData(formData);
    const imageFile = data.imageFile;

    // Basic validation without Zod
    const validation = validateArtist({
      alias: data.alias,
      name: data.name,
      orgRole: data.orgRole.join(','),
    });
    
    if (!validation.success) {
      return { error: validation.errors.join(', ') };
    }

    // Upload image if provided
    let imageUrl = data.image;
    if (imageFile && imageFile.size > 0) {
      imageUrl = await artistService.uploadImage(imageFile);
    }

    const newArtist = buildArtistData(data, imageUrl);

    await artistService.create(newArtist);
    
    revalidatePath('/');
    revalidatePath('/admin/artists');
  } catch (error: unknown) {
    const err = error as Error;
    return { error: err.message };
  }

  redirect('/admin/artists');
}

export async function updateArtistAction(id: string, formData: FormData) {
  try {
    const data = sanitizeFormData(formData);
    const imageFile = data.imageFile;

    // Upload new image if provided
    let imageUrl = data.image;
    if (imageFile && imageFile.size > 0) {
      imageUrl = await artistService.uploadImage(imageFile);
    }

    const updates = buildArtistData({ ...data, image: imageUrl }, imageUrl);

    await artistService.update(id, updates);
    
    revalidatePath('/');
    revalidatePath('/admin/artists');
    revalidatePath(`/admin/artists/edit/${id}`);
  } catch (error: unknown) {
    const err = error as Error;
    return { error: err.message };
  }

  redirect('/admin/artists');
}

export async function deleteArtistAction(id: string) {
  try {
    await artistService.delete(id);
    revalidatePath('/');
    revalidatePath('/admin/artists');
    return { success: true };
  } catch (error: unknown) {
    const err = error as Error;
    return { error: err.message };
  }
}
