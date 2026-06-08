'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaLocationDot, FaPenToSquare } from 'react-icons/fa6';
import { adminReadService } from '@/features/admin/services';
import { departmentsConfig } from '@/features/admin/tableConfigs';
import AdminForm from '@/features/admin/components/AdminForm';
import styles from '../../page.module.css';

interface Country {
  id: number;
  name: string;
}

interface Department {
  id: number;
  country_id: number;
  country_name: string;
  code: string;
  name: string;
  created_at: string;
  countries?: { name: string }[] | { name: string } | null;
}

export default function EditDepartmentPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [item, setItem] = useState<Department | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch countries for the select dropdown
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { supabase } = await import('@/shared/api/supabase');
        const { data, error } = await supabase
          .from('countries')
          .select('id, name')
          .order('name');
        if (!error && data) {
          setCountries(data);
        }
      } catch (err) {
        console.error('Error fetching countries:', err);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { supabase } = await import('@/shared/api/supabase');
        const { data, error } = await supabase
          .from('departments')
          .select(`
            id,
            country_id,
            code,
            name,
            created_at,
            countries!inner(name)
          `)
          .eq('id', id)
          .single();

        if (error) throw new Error(error.message);

        if (data) {
          const itemData = data as any;
          const countriesData = itemData.countries as { name: string }[] | { name: string } | null;
          const countryName = Array.isArray(countriesData) 
            ? countriesData[0]?.name 
            : countriesData?.name;
          setItem({
            ...itemData,
            country_name: countryName || 'Desconocido',
          });
        } else {
          setError('Departamento no encontrado');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  // Update config with country options
  const configWithCountries = {
    ...departmentsConfig,
    columns: departmentsConfig.columns.map(col => 
      col.name === 'country_id' 
        ? { ...col, options: countries.map(c => ({ value: String(c.id), label: c.name })) }
        : col
    ),
  };

  const handleSubmit = async (formData: Record<string, any>) => {
    const res = await fetch(`/api/admin/departments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    if (result.error) throw new Error(result.error);
    router.push('/admin/departments');
    router.refresh();
  };

  const handleCancel = () => {
    router.push('/admin/departments');
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
            <FaLocationDot className={styles.icon} /> Editar Departamento
          </h1>
        </header>
        <div className={styles.error}>
          {error || 'Departamento no encontrado'}
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
            <FaPenToSquare className={styles.icon} /> Editar Departamento
          </h1>
          <p className={styles.subtitle}>Modifica los datos del departamento</p>
        </div>
      </header>

      <AdminForm
        config={configWithCountries.columns}
        initialData={item}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Actualizar"
        title={`Editar: ${item.name}`}
      />
    </div>
  );
}