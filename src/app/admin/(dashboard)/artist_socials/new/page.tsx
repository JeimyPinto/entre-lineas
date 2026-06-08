'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaLink } from 'react-icons/fa6';
import { artistSocialsConfig } from '@/features/admin/tableConfigs';
import AdminForm from '@/features/admin/components/AdminForm';
import styles from '../page.module.css';

interface Artist {
  id: number;
  name: string;
}

export default function NewArtistSocialPage() {
  const router = useRouter();
  const [artists, setArtists] = useState<Artist[]>([]);

  // Fetch artists for the select dropdown
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const { supabase } = await import('@/shared/api/supabase');
        const { data, error } = await supabase
          .from('artists')
          .select('id, name')
          .order('name');
        if (!error && data) {
          setArtists(data);
        }
      } catch (err) {
        console.error('Error fetching artists:', err);
      }
    };
    fetchArtists();
  }, []);

  // Update config with artist options
  const configWithArtists = {
    ...artistSocialsConfig,
    columns: artistSocialsConfig.columns.map(col => 
      col.name === 'artist_id' 
        ? { ...col, options: artists.map(a => ({ value: String(a.id), label: a.name })) }
        : col
    ),
  };

  const handleSubmit = async (formData: Record<string, any>) => {
    const res = await fetch('/api/admin/artist_socials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    if (result.error) throw new Error(result.error);
    router.push('/admin/artist_socials');
    router.refresh();
  };

  const handleCancel = () => {
    router.push('/admin/artist_socials');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>
            <FaLink className={styles.icon} /> Nueva Red Social
          </h1>
          <p className={styles.subtitle}>Añade un nuevo enlace de red social para un artista</p>
        </div>
      </header>

      <AdminForm
        config={configWithArtists.columns}
        initialData={{}}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Crear"
        title="Nueva Red Social"
      />
    </div>
  );
}