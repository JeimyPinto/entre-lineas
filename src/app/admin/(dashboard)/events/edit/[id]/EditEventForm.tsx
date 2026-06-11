export const dynamic = 'force-dynamic';

import EditEventFormClient from './EditEventFormClient';
import { Event } from '@/entities';

interface EditEventFormProps {
  event: Event;
  id: string;
}

export default function EditEventForm({ event, id }: EditEventFormProps) {
  return <EditEventFormClient event={event} id={id} />;
}