export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  postUrl: string;
  youtubeLink?: string;
  judges: {
    name: string;
    image?: string;
    artistId?: string;
  }[];
  host?: {
    name: string;
    image?: string;
    artistId?: string;
  }[];
}
