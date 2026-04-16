export interface SocialLink {
  platform: 'instagram' | 'youtube' | 'facebook' | 'web' | 'tiktok' | 'other';
  url: string;
  label: string;
}

export interface Artist {
  id: string;
  name: string;
  orgRole: string[]; // Rol dentro de la organización (ej. Juez, Host, Fundador)
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  imagePosition?: string; // Porcentaje de posición vertical (ej. '50%' o 'top')
  profession: string; // Carrera o profesión (ej. Rapero, Productor, Abogado)
  origin: string; // Ciudad o lugar de origen
  trajectory: string; // Tiempo en la escena (ej. Desde 2019)
  bio: string[];
  socials: SocialLink[];
}
