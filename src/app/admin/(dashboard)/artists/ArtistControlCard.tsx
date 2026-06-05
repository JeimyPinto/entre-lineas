'use client';

import { Artist } from '@/entities/artist/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { deleteArtistAction } from '@/app/actions/artistActions';
import styles from './artists.module.css';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa6';

export default function ArtistControlCard({ artist }: { artist: Artist }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!artist.id) {
      alert("ID del artista no válido");
      return;
    }
    if (confirm(`¿Estás seguro de eliminar a ${artist.name}? Esta acción no se puede deshacer.`)) {
      setIsDeleting(true);
      const result = await deleteArtistAction(artist.id);
      if (result?.error) {
        alert("Error al eliminar: " + result.error);
        setIsDeleting(false);
      }
    }
  };

  const hasImage = artist.image && artist.image.length > 0;

  return (
    <Card title={artist.alias || artist.name} subtitle={artist.orgRole.join(', ')}>
      {/* Thumbnail */}
      {hasImage ? (
        <img 
          src={artist.image} 
          alt={artist.alias || artist.name}
          className={styles.thumbnail}
        />
      ) : (
        <div className={styles.thumbnailPlaceholder}>
          <FaUser />
        </div>
      )}

      <div className={styles.artistInfo}>
        <p><strong>Nombre real:</strong> {artist.name}</p>
        <p><strong>Profesión u Ocupación:</strong> {artist.profession || 'N/A'}</p>

        <div className={styles.actions}>
          <Button
            href={artist.id ? `/admin/artists/edit/${artist.id}` : '#'}
            variant="ghost"
            fullWidth
            disabled={!artist.id}
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
