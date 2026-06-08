'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaLink, FaPenToSquare } from 'react-icons/fa6';
import { adminReadService } from '@/features/admin/services';
import { artistSocialsConfig } from '@/features/admin/tableConfigs';
import AdminForm from '@/features/admin/components/AdminForm';
import styles from '../../page.module.css';

interface Artist {
  id: number;
  name: string;
}

interface ArtistSocial {
  id: number;
  artist_id: number;
  artist_name: string;
  platform: string;
  url: string;
  created_at: string;
  artists?: { name: string }[] | { name: string } | null;
}

export default function EditArtistSocialPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [item, setItem] = useState<ArtistSocial | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { supabase } = await import('@/shared/api/supabase');
        const { data, error } = await supabase
          .from('artist_socials')
          .select(`
            id,
            artist_id,
            platform,
            url,
            created_at,
            artists!inner(name)
          `)
          .eq('id', id)
          .single();

        if (error) throw new Error(error.message);

        if (data) {
          const itemData = data as any;
          const artistsData = itemData.artists as { name: string }[] | { name: string } | null;
          const artistName = Array.isArray(artistsData) 
            ? artistsData[0]?.name 
            : artistsData?.name;
          setItem({
            ...itemData,
            artist_name: artistName || 'Desconocido',
          });
        } else {
          setError('Red social no encontrada');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

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
    const res = await fetch(`/api/admin/artist_socials/${id}`, {
      method: 'PUT',
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

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Cargando...</div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <FaLink className={styles.icon} /> Editar Red Social
          </h1>
        </header>
        <div className={styles.error}>
          {error || 'Red social no encontrada'}
          <button onClick={handleCancel} className={styles.errorClose}>Volver</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>
            <FaPenToSquare className={styles.icon} /> Editar Red Social
          </h1>
          <p className={styles.subtitle}>Modifica los datos de la red social</p>
        </div>
      </header>

      <AdminForm
        config={configWithArtists.columns}
        initialData={item}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Actualizar"
        title={`Editar: ${item.platform}`}
      />
    </div>
  );
}