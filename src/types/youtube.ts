export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  viewCount?: string;
  likeCount?: string;
  commentCount?: string;
}

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
