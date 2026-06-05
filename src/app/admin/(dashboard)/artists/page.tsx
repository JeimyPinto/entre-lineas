import { artistService } from '@/features/artists/services';
import ArtistsGridClient from './ArtistsGridClient';
import styles from './artists.module.css';
import { Artist } from '@/entities/artist/types';

export const dynamic = 'force-dynamic';

export default async function Page() {
  let artists: Artist[] = [];
  let loadError = false;

  try {
    artists = await artistService.getAll();
  } catch {
    loadError = true;
  }

  if (loadError) {
    return (
      <div className={styles.container}>
        <p style={{ color: 'var(--color-red)' }}>
          Error al conectar con el servidor. No se pudieron cargar los artistas.
        </p>
      </div>
    );
  }

  return <ArtistsGridClient artists={artists} />;
}
