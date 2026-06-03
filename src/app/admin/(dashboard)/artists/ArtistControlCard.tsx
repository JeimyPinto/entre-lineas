'use client';

import { Artist } from '@/entities/artist/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { deleteArtistAction } from '@/app/actions/artistActions';
import styles from './artists.module.css';
import { useState } from 'react';

export default function ArtistControlCard({ artist }: { artist: Artist }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm(`¿Estás seguro de eliminar a ${artist.name}? Esta acción no se puede deshacer.`)) {
      setIsDeleting(true);
      const result = await deleteArtistAction(artist.id);
      if (result?.error) {
        alert("Error al eliminar: " + result.error);
        setIsDeleting(false);
      }
    }
  };

  return (
    <Card title={artist.name} subtitle={artist.orgRole.join(', ')}>
      <div className={styles.artistInfo}>
        <p><strong>ID/Alias:</strong> {artist.id}</p>
        <p><strong>Profesión u Ocupación:</strong> {artist.profession || 'N/A'}</p>

        <div className={styles.actions}>
          <Button
            href={`/admin/artists/edit/${artist.id}`}
            variant="ghost"
            fullWidth
          >
            Editar
          </Button>

          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={isDeleting}
            fullWidth
          >
            {isDeleting ? 'Borrando...' : 'Eliminar'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
