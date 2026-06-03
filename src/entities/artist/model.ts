import { Artist as ArtistType } from './types';

export class Artist {
  /**
   * Crea un objeto PLANO de Artist desde los datos de Supabase
   * Next.js requiere objetos planos para pasar datos entre Server y Client Components
   */
static fromDb(dbData: any): ArtistType {
    return {
      id: String(dbData.id),
      alias: dbData.alias || dbData.name,
      name: dbData.name,
      orgRole: dbData.org_role || [],
      image: dbData.image,
      imagePosition: dbData.image_position || '50%',
      profession: dbData.profession,
      origin: dbData.origin,
      trajectory: dbData.trajectory,
      bio: dbData.bio || [],
      socials: dbData.socials || []
    };
  }

  /**
   * Convierte un objeto de tipo Artist a uno compatible con DB
   */
static toDb(artist: Partial<ArtistType>) {
    return {
      alias: artist.alias,
      name: artist.name,
      org_role: artist.orgRole,
      image: artist.image,
      image_position: artist.imagePosition,
      profession: artist.profession,
      origin: artist.origin,
      trajectory: artist.trajectory,
      bio: artist.bio,
      socials: artist.socials
    };
  }
}
