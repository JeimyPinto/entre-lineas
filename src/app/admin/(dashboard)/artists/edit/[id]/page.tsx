import { artistService } from '@/features/artists/services';
import Button from '@/shared/ui/Button/Button';
import Card from '@/shared/ui/Card/Card';
import EditArtistForm from './EditArtistForm';
import styles from '../../new/new.module.css';

export default async function EditArtistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let artist = null;
  let error = null;

  try {
    artist = await artistService.getById(id);
    if (!artist) error = "Talento no encontrado";
  } catch (err) {
    error = err instanceof Error ? err.message : 'Error desconocido';
  }

  if (error || !artist) {
    return (
      <div className={styles.container}>
        <Card title="Error">
          <p>{error || `El talento con ID ${id} no existe.`}</p>
          <Button href="/admin/artists" variant="outline" style={{ marginTop: '1rem' }}>Volver a la lista</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Button href="/admin/artists" variant="outline">Volver</Button>
        <h1>Editar Talento</h1>
      </header>

      <EditArtistForm artist={artist} id={id} />
    </div>
  );
}
