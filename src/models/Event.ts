import { Event as EventType } from '@/types/events';

export class Event {
  static fromDb(dbData: any): EventType {
    return {
      id: dbData.id,
      title: dbData.title,
      date: dbData.date,
      location: dbData.location,
      postUrl: dbData.postUrl,
      youtubeLink: dbData.youtube_link,
      judges: dbData.judges || [],
      host: dbData.host || []
    };
  }

  static toDb(event: Partial<EventType>) {
    return {
      id: event.id,
      title: event.title,
      date: event.date,
      location: event.location,
      postUrl: event.postUrl,
      youtube_link: event.youtubeLink,
      judges: event.judges,
      host: event.host
    };
  }
}
