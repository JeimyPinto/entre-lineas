import { supabase as supabaseAnon } from '@/lib/supabase';
import { createClient } from '@/lib/supabaseServer';
import { Artist as ArtistType } from '@/types/artists';
import { Artist } from '@/models/Artist';

export const artistService = {
  
  async getAll(): Promise<ArtistType[]> {
    try {
      const { data, error } = await supabaseAnon
        .from('artists')
        .select('*')
        .order('name');

      if (error) {
        console.error('[artistService.getAll] Error:', error.message);
        return [];
      }
      return (data || []).map(db => Artist.fromDb(db));
    } catch (err) {
      console.error('[artistService.getAll] Unexpected error:', err);
      return [];
    }
  },

  async getById(id: string): Promise<ArtistType | null> {
    const { data, error } = await supabaseAnon
      .from('artists')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return Artist.fromDb(data);
  },

  async create(artistData: ArtistType): Promise<ArtistType> {
    const supabase = await createClient(); // Cliente con Auth
    const { data, error } = await supabase
      .from('artists')
      .insert([Artist.toDb(artistData)])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return Artist.fromDb(data);
  },

  async update(id: string, updates: Partial<ArtistType>): Promise<ArtistType> {
    const supabase = await createClient(); // Cliente con Auth
    const { data, error } = await supabase
      .from('artists')
      .update(Artist.toDb(updates))
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[artistService.update] Error de Supabase:', error);
      throw new Error(error.message);
    }
    return Artist.fromDb(data);
  },

  async uploadImage(file: File): Promise<string> {
    const supabase = await createClient(); // Cliente con Auth
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `profiles/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('artists')
      .upload(filePath, file);

    if (uploadError) {
      console.error('[artistService.uploadImage] Error de Supabase Storage:', uploadError);
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('artists')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  async delete(id: string): Promise<void> {
    const supabase = await createClient(); // Cliente con Auth
    const { error } = await supabase
      .from('artists')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
};
