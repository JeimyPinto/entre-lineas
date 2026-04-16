import { artistService } from '@/services/artistService';
import Button from '@/components/ui/Button';
import ArtistControlCard from './ArtistControlCard';
import styles from './artists.module.css';

export default async function AdminArtistsPage() {
  const artists = await artistService.getAll();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Gestión de Artistas</h1>
        <Button href="/admin/artists/new">Nuevo Artista</Button>
      </div>

      <div className={styles.grid}>
        {artists.map((artist) => (
          <ArtistControlCard key={artist.id} artist={artist} />
        ))}
        {artists.length === 0 && (
          <p style={{ color: 'var(--color-grey-light)' }}>No hay artistas registrados aún.</p>
        )}
      </div>
    </div>
  );
}
