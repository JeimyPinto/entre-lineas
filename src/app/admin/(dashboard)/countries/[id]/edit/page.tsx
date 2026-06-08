'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaFlag, FaPenToSquare } from 'react-icons/fa6';
import { adminReadService } from '@/features/admin/services';
import { countriesConfig } from '@/features/admin/tableConfigs';
import AdminForm from '@/features/admin/components/AdminForm';
import styles from '../../page.module.css';

interface Country {
  id: number;
  code: string;
  name: string;
  has_departments: boolean;
  created_at: string;
}

export default function EditCountryPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [item, setItem] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await adminReadService.getById<Country>(countriesConfig, id);
        if (data) {
          setItem(data);
        } else {
          setError('País no encontrado');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleSubmit = async (formData: Record<string, any>) => {
    const res = await fetch(`/api/admin/countries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    if (result.error) throw new Error(result.error);
    router.push('/admin/countries');
    router.refresh();
  };

  const handleCancel = () => {
    router.push('/admin/countries');
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
            <FaFlag className={styles.icon} /> Editar País
          </h1>
        </header>
        <div className={styles.error}>
          {error || 'País no encontrado'}
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
            <FaPenToSquare className={styles.icon} /> Editar País
          </h1>
          <p className={styles.subtitle}>Modifica los datos del país</p>
        </div>
      </header>

      <AdminForm
        config={countriesConfig.columns}
        initialData={item}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Actualizar"
        title={`Editar: ${item.name}`}
      />
    </div>
  );
}