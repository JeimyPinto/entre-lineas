'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaLocationDot } from 'react-icons/fa6';
import { departmentsConfig } from '@/features/admin/tableConfigs';
import AdminForm from '@/features/admin/components/AdminForm';
import styles from '../page.module.css';

interface Country {
  id: number;
  name: string;
}

export default function NewDepartmentPage() {
  const router = useRouter();
  const [countries, setCountries] = useState<Country[]>([]);

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
    const res = await fetch('/api/admin/departments', {
      method: 'POST',
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

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>
            <FaLocationDot className={styles.icon} /> Nuevo Departamento
          </h1>
          <p className={styles.subtitle}>Añade un nuevo departamento/estado/provincia</p>
        </div>
      </header>

      <AdminForm
        config={configWithCountries.columns}
        initialData={{}}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Crear"
        title="Nuevo Departamento"
      />
    </div>
  );
}