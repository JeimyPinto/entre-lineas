import { BaseEntity, EventParticipant, Imageable, Timestamped } from '../shared/base';

/**
 * Event Entity
 * 
 * Extends BaseEntity with event-specific fields.
 * Uses EventParticipant for judges and hosts.
 * id is optional for creation (assigned by DB)
 */
export interface Event extends Omit<BaseEntity, 'id'>, Imageable, Timestamped {
  id?: string | number;  // Optional for creation
  
  /** Event title - overrides name from BaseEntity */
  title: string;
  
  /** Event date (ISO string or formatted) */
  date: string;
  
  /** Event location */
  location: string;
  
  /** Instagram post URL */
  postUrl: string;
  
  /** YouTube video link */
  youtubeLink?: string;
  
  /** Event judges */
  judges: EventParticipant[];
  
  /** Event hosts */
  host?: EventParticipant[];
}

// Re-export EventParticipant for convenience
export type { EventParticipant } from '../shared/base';