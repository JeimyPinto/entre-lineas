'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Artist } from '@/entities/artist/types';
import Button from '@/shared/ui/Button/Button';
import Input from '@/shared/ui/Input/Input';
import ArtistControlCard from './ArtistControlCard';
import styles from './artists.module.css';
import VirtualizedGrid from '@/shared/ui/VirtualizedGrid/VirtualizedGrid';

interface ArtistsGridClientProps {
  artists: Artist[];
}

export default function ArtistsGridClient({ artists }: ArtistsGridClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [search, setSearch] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('search') || '';
    }
    return '';
  });

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

  // Sync search to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (search.trim()) {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [search, searchParams, router]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Gestión de Artistas</h1>
        <Button href="/admin/artists/new" className={styles.newArtistBtn} aria-label="Nuevo artista">
          <span className={styles.btnIcon}>+</span>
          <span className={styles.btnText}>Nuevo Artista</span>
        </Button>
      </div>

      <div className={styles.searchBar}>
        <Input
          type="search"
          placeholder="Buscar por nombre, rol o profesión..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      <div className={styles.grid}>
        <VirtualizedGrid
          items={filteredArtists}
          columnCount={3}
          itemHeight={280}
          itemWidth={320}
          overscanCount={5}
          emptyMessage={search ? 'No se encontraron artistas con ese criterio.' : 'No hay artistas registrados aún.'}
        >
          {(artist) => <ArtistControlCard artist={artist} />}
        </VirtualizedGrid>
      </div>
    </div>
  );
}
