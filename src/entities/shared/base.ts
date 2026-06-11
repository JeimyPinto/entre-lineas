/**
 * Base Entity Interfaces
 * 
 * Composable base interfaces for building domain entities.
 * Use interface extension to compose entity types from these traits.
 */

// ============================================
// Primitive Trait Interfaces
// ============================================

/** Entity with a unique identifier */
export interface Identifiable {
  id: string | number;
}

/** Entity with a name (and optional display name) */
export interface Named {
  name: string;
  displayName?: string;
}

/** Entity with image metadata */
export interface Imageable {
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imagePosition?: string;
}

/** Entity with timestamp fields */
export interface Timestamped {
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/** Entity with social links */
export interface Socialable {
  socials?: SocialLink[];
}

/** Social media link */
export interface SocialLink {
  platform: 'instagram' | 'youtube' | 'facebook' | 'web' | 'tiktok' | 'other';
  url: string;
  label: string;
}

/** Entity with a description/bio */
export interface Describable {
  description?: string;
  bio?: string[];
}

/** Entity with location/origin */
export interface Locatable {
  origin?: string;
  location?: string;
}

/** Entity with role/classification */
export interface Classifiable {
  role?: string;
  category?: string;
  type?: string;
}

// ============================================
// Composed Base Types
// ============================================

/** Minimal base entity */
export type BaseEntity = Identifiable & Named & Timestamped;

/** Entity with media (image) support */
export type MediaEntity = BaseEntity & Imageable;

/** Entity with social features */
export type SocialEntity = BaseEntity & Socialable;

/** Full-featured entity with media and social */
export type FullEntity = MediaEntity & Socialable & Describable & Locatable & Classifiable;

/** Video-specific base */
export interface VideoBase extends Identifiable, Named, Imageable {
  title: string;        // Override name for clarity
  thumbnail: string;    // Override image for clarity
}

/** Participant in events (judges, hosts) */
export interface EventParticipant {
  name: string;
  image?: string;
  artistId?: string;
}

// ============================================
// Utility Types
// ============================================

/** Make all properties optional except specified keys */
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

/** Make specified keys required */
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Extract ID type from entity */
export type EntityId<T extends Identifiable> = T['id'];

/** Entity without ID (for creation) */
export type CreateEntity<T extends Identifiable> = Omit<T, 'id'>;

/** Entity with only ID (for deletion) */
export type DeleteEntity<T extends Identifiable> = Pick<T, 'id'>;