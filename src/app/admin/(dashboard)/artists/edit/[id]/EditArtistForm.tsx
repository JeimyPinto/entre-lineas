export const dynamic = 'force-dynamic';

import EditArtistFormClient from './EditArtistFormClient';
import { Artist } from '@/entities';

interface EditArtistFormProps {
  artist: Artist;
  id: string;
}

export default function EditArtistForm({ artist, id }: EditArtistFormProps) {
  return <EditArtistFormClient artist={artist} id={id} />;
}