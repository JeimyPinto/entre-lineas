import { artistService } from '@/features/artists/services';
import Button from '@/components/ui/Button';
import ArtistControlCard from './ArtistControlCard';
import styles from './artists.module.css';

export default async function AdminArtistsPage() {
  let artists: import('@/entities/artist/types').Artist[] = [];
  let loadError = false;

  try {
    artists = await artistService.getAll();
  } catch {
    loadError = true;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Gestión de Artistas</h1>
        <Button href="/admin/artists/new">Nuevo Artista</Button>
      </div>

      <div className={styles.grid}>
        {loadError && (
          <p style={{ color: 'var(--color-red)', gridColumn: '1 / -1' }}>
            Error al conectar con el servidor. No se pudieron cargar los artistas.
          </p>
        )}
        {!loadError && artists.map((artist) => (
          <ArtistControlCard key={artist.id} artist={artist} />
        ))}
        {!loadError && artists.length === 0 && (
          <p style={{ color: 'var(--color-grey-light)' }}>No hay artistas registrados aún.</p>
        )}
      </div>
    </div>
  );
}
