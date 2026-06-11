import { supabase as supabaseAnon } from '@/shared/api/supabase';
import { createClient } from '@/shared/api/supabaseServer';
import { Artist as ArtistType, SocialLink } from '@/entities';
import { Artist } from '@/entities/artist/model';

export const artistService = {
  
  async getAll(): Promise<ArtistType[]> {
    try {
      const { data: artists, error } = await supabaseAnon
        .from('artists')
        .select('*')
        .order('name');

      if (error) {
        console.error('[artistService.getAll] Error:', error.message);
        return [];
      }

      const artistsData = (artists || []) as any[];

// Get all social links in one query
      const artistIds = artistsData.map(a => a.id);
      const socialLinksMap: Record<number, SocialLink[]> = {};
      
      if (artistIds.length > 0) {
        const { data: socials } = await supabaseAnon
          .from('artist_socials')
          .select('artist_id, platform, url, label')
          .in('artist_id', artistIds);

        const socialsData = (socials || []) as any[];

        if (socialsData.length > 0) {
          socialsData.forEach(s => {
            if (!socialLinksMap[s.artist_id]) {
              socialLinksMap[s.artist_id] = [];
            }
            socialLinksMap[s.artist_id].push({
              platform: s.platform as SocialLink['platform'],
              url: s.url,
              label: s.label || s.platform
            });
          });
        }
      }

      return artistsData.map(db => {
        const artist = Artist.fromDb(db);
        // Add social links from new table
        const artistId = typeof db.id === 'number' ? db.id : parseInt(String(db.id));
        if (socialLinksMap[artistId]) {
          artist.socials = socialLinksMap[artistId];
        }
        return artist;
      });
    } catch (err) {
      console.error('[artistService.getAll] Unexpected error:', err);
      return [];
    }
  },

  async getById(id: string): Promise<ArtistType | null> {
    const { data: artist, error } = await supabaseAnon
      .from('artists')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    
    const artistData = artist as any;
    const artistId = typeof artistData.id === 'number' ? artistData.id : parseInt(String(artistData.id));
    const { data: socials } = await supabaseAnon
      .from('artist_socials')
      .select('platform, url, label')
      .eq('artist_id', artistId);

    const result = Artist.fromDb(artistData);
    const socialsData = (socials || []) as any[];
    if (socialsData.length > 0) {
      result.socials = socialsData.map(s => ({
        platform: s.platform as SocialLink['platform'],
        url: s.url,
        label: s.label || s.platform
      }));
    }
    return result;
  },

  async create(artistData: ArtistType): Promise<ArtistType> {
    const supabase = await createClient(); // Cliente con Auth
    
    // Extract socials to insert separately
    const socials = artistData.socials || [];
    const artistWithoutSocials = { ...artistData, socials: [] };
    
    const { data, error } = await supabase
      .from('artists')
      .insert([Artist.toDb(artistWithoutSocials)])
      .select()
      .single();

    if (error) throw new Error(error.message);
    
    const artistId = typeof data.id === 'number' ? data.id : parseInt(String(data.id));
    
    // Insert social links
    if (socials.length > 0) {
      const socialRecords = socials.map(s => ({
        artist_id: artistId,
        platform: s.platform,
        url: s.url,
        label: s.label || s.platform
      }));
      
      await supabase.from('artist_socials').insert(socialRecords);
    }

    return Artist.fromDb(data);
  },

  async update(id: string, updates: Partial<ArtistType>): Promise<ArtistType> {
    const supabase = await createClient(); // Cliente con Auth
    
    // If socials are being updated, handle separately
    const socials = updates.socials;
    const updatesWithoutSocials = { ...updates, socials: [] };
    
    const { data, error } = await supabase
      .from('artists')
      .update(Artist.toDb(updatesWithoutSocials))
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[artistService.update] Error de Supabase:', error);
      throw new Error(error.message);
    }

    // Update social links if provided
    if (socials !== undefined) {
      const artistId = typeof data.id === 'number' ? data.id : parseInt(String(data.id));
      
      // Delete existing socials
      await supabase.from('artist_socials').delete().eq('artist_id', artistId);
      
      // Insert new socials
      if (socials.length > 0) {
        const socialRecords = socials.map(s => ({
          artist_id: artistId,
          platform: s.platform,
          url: s.url,
          label: s.label || s.platform
        }));
        
        await supabase.from('artist_socials').insert(socialRecords);
      }
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
