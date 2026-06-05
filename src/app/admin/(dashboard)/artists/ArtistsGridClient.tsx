'use client';

import { useState, useMemo } from 'react';
import { Artist } from '@/entities/artist/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ArtistControlCard from './ArtistControlCard';
import styles from './artists.module.css';

interface ArtistsGridClientProps {
  artists: Artist[];
}

export default function ArtistsGridClient({ artists }: ArtistsGridClientProps) {
  const [search, setSearch] = useState('');

  const filteredArtists = useMemo(() => {
    if (!search.trim()) return artists;
    const query = search.toLowerCase();
    return artists.filter(artist => 
      artist.alias?.toLowerCase().includes(query) ||
      artist.name?.toLowerCase().includes(query) ||
      artist.orgRole?.some(role => role.toLowerCase().includes(query)) ||
      artist.profession?.toLowerCase().includes(query)
    );
  }, [artists, search]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Gestión de Artistas</h1>
        <Button href="/admin/artists/new">Nuevo Artista</Button>
      </div>

      <div className={styles.searchBar}>
        <Input
          type="search"
          placeholder="Buscar por nombre, rol o profesión..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.grid}>
        {filteredArtists.map((artist) => (
          <ArtistControlCard key={artist.id} artist={artist} />
        ))}
        {filteredArtists.length === 0 && (
          <p style={{ color: 'var(--color-grey-light)', gridColumn: '1 / -1' }}>
            {search ? 'No se encontraron artistas con ese criterio.' : 'No hay artistas registrados aún.'}
          </p>
        )}
      </div>
    </div>
  );
}
