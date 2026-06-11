import { 
  MediaEntity, 
  Socialable, 
  Describable, 
  Locatable, 
  Classifiable,
  SocialLink 
} from '../shared/base';

/**
 * Artist Entity
 * 
 * Extends composed base interfaces for media, social, description, location, and classification.
 * Adds artist-specific fields: alias, orgRole, profession, trajectory.
 * id is optional for creation (assigned by DB)
 */
export interface Artist extends Omit<MediaEntity, 'id'>, Socialable, Describable, Locatable, Classifiable {
  id?: string | number;  // Optional for creation
  
  /** Nombre artístico/apodo (para mostrar en la interfaz) - overrides displayName */
  alias: string;
  
  /** Rol dentro de la organización (ej. Juez, Host, Fundador) */
  orgRole: string[];
  
  /** Carrera o Profesión u Ocupación (ej. Rapero, Productor, Abogado) */
  profession: string;
  
  /** Tiempo en la escena (ej. Desde 2019) */
  trajectory: string;
  
  /** Biografía en párrafos - overrides bio from Describable */
  bio: string[];
  
  /** Redes sociales (almacenadas en tabla separada artist_socials) - required here */
  socials: SocialLink[];
}

// Re-export SocialLink for backward compatibility
export type { SocialLink } from '../shared/base';