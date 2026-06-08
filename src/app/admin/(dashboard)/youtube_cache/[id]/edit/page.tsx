'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaDatabase, FaEye } from 'react-icons/fa6';
import { adminReadService } from '@/features/admin/services';
import { youtubeCacheConfig } from '@/features/admin/tableConfigs';
import AdminForm from '@/features/admin/components/AdminForm';
import styles from '../../page.module.css';

interface YouTubeCache {
  id: string;
  data: any;
  updated_at: string;
}

export default function EditYouTubeCachePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [item, setItem] = useState<YouTubeCache | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await adminReadService.getById<YouTubeCache>(youtubeCacheConfig, id);
        if (data) {
          setItem(data);
        } else {
          setError('Entrada de cache no encontrada');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleCancel = () => {
    router.push('/admin/youtube_cache');
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
            <FaDatabase className={styles.icon} /> Ver Cache
          </h1>
        </header>
        <div className={styles.error}>
          {error || 'Entrada de cache no encontrada'}
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
            <FaEye className={styles.icon} /> Ver Cache: {item.id}
          </h1>
          <p className={styles.subtitle}>Datos cacheados (solo lectura)</p>
        </div>
      </header>

      <AdminForm
        config={youtubeCacheConfig.columns}
        initialData={item}
        onSubmit={async () => {}}
        onCancel={handleCancel}
        submitLabel="Cerrar"
        title={`Cache: ${item.id}`}
      />
    </div>
  );
}