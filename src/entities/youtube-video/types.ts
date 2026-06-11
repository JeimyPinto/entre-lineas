import { VideoBase, Identifiable, Named, Imageable } from '../shared/base';

/**
 * Base video interface with common fields
 * Extends VideoBase from shared/base.ts
 * id is optional for creation
 */
export interface Video extends Omit<VideoBase, 'id'> {
  id?: string | number;
  viewCount?: string;
  likeCount?: string;
  commentCount?: string;
}

/**
 * Full YouTube video with additional metadata
 * id is optional for creation
 */
export interface YouTubeVideo extends Omit<VideoBase, 'id'> {
  id?: string | number;
  duration: string;
  publishedAt: string;
}

/**
 * Gallery data structure for YouTube content
 */
export interface GalleryData {
  shorts: Video[];
  videos: Video[];
  subscriberCount?: string;
  highlights?: {
    viral: Video | null;
    mostLiked: Video | null;
    mostCommented: Video | null;
  };
}

// Re-export base types for convenience
export type { VideoBase, Identifiable, Named, Imageable } from '../shared/base';