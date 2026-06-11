'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { eventService } from '@/features/events/services';
import { Event } from '@/entities';

function parseNames(raw: string | null): { name: string }[] {
  if (!raw) return [];
  return raw.split(',').map(name => ({ name: name.trim() })).filter(n => n.name);
}

export async function createEventAction(formData: FormData) {
  try {
    const rawJudges = formData.get('judges') as string;
    const rawHosts = formData.get('hosts') as string;

    const newEvent: Event = {
      id: Number(formData.get('id')),
      name: formData.get('title') as string,  // Required by BaseEntity
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      location: formData.get('location') as string,
      postUrl: formData.get('postUrl') as string,
      youtubeLink: formData.get('youtubeLink') as string,
      judges: parseNames(rawJudges),
      host: parseNames(rawHosts)
    };

    if (!newEvent.title || newEvent.id === undefined || isNaN(Number(newEvent.id))) {
      throw new Error("El título y el número de edición (ID) son obligatorios");
    }

    await eventService.create(newEvent);
    
    revalidatePath('/');
    revalidatePath('/admin/events');
  } catch (error: any) {
    return { error: error.message };
  }

  redirect('/admin/events');
}

export async function updateEventAction(id: string, formData: FormData) {
  try {
    const rawJudges = formData.get('judges') as string;
    const rawHosts = formData.get('hosts') as string;

    const updates: Partial<Event> = {
      id: Number(formData.get('id')),
      name: formData.get('title') as string,  // Required by BaseEntity
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      location: formData.get('location') as string,
      postUrl: formData.get('postUrl') as string,
      youtubeLink: formData.get('youtubeLink') as string,
      judges: parseNames(rawJudges),
      host: parseNames(rawHosts)
    };

    if (!updates.title || updates.id === undefined || isNaN(Number(updates.id))) {
      throw new Error("El título y el número de edición (ID) son obligatorios");
    }

    await eventService.update(id, updates);
    
    revalidatePath('/');
    revalidatePath('/admin/events');
    revalidatePath(`/admin/events/edit/${id}`);
  } catch (error: any) {
    return { error: error.message };
  }

  redirect('/admin/events');
}

export async function deleteEventAction(formData: FormData) {
  try {
    const id = formData.get('id') as string;
    await eventService.delete(id);
    revalidatePath('/');
    revalidatePath('/admin/events');
  } catch (error: any) {
    console.error('Delete event error:', error.message);
  }
}
