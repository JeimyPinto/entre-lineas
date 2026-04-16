'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { eventService } from '@/services/eventService';
import { Event } from '@/types/events';

export async function createEventAction(formData: FormData) {
  try {
    const rawJudges = formData.get('judges') as string;
    const rawHosts = formData.get('hosts') as string;

    const newEvent: Event = {
      id: Number(formData.get('id')), // En la DB es el número de edición
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      location: formData.get('location') as string,
      postUrl: formData.get('postUrl') as string,
      youtubeLink: formData.get('youtubeLink') as string,
      // Convertimos el texto separado por comas en objetos para la DB
      judges: rawJudges.split(',').map(name => ({ name: name.trim() })),
      host: rawHosts ? rawHosts.split(',').map(name => ({ name: name.trim() })) : []
    };

    if (!newEvent.title || isNaN(newEvent.id)) {
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
