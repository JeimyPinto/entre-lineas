import { supabase as supabaseAnon } from '@/lib/supabase';
import { createClient } from '@/lib/supabaseServer';
import { Event as EventType } from '@/types/events';
import { Event } from '@/models/Event';

export const eventService = {
  
  async getAll(): Promise<EventType[]> {
    try {
      const { data, error } = await supabaseAnon
        .from('events')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error('[eventService.getAll] Error:', error.message);
        return [];
      }
      return (data || []).map(db => Event.fromDb(db));
    } catch (err) {
      console.error('[eventService.getAll] Unexpected error:', err);
      return [];
    }
  },

  async create(eventData: EventType): Promise<EventType> {
    const supabase = await createClient(); // Cliente con Auth
    const { data, error } = await supabase
      .from('events')
      .insert([Event.toDb(eventData)])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return Event.fromDb(data);
  }
};
