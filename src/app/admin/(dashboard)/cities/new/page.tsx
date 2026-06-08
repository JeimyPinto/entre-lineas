'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaBuilding } from 'react-icons/fa6';
import { citiesConfig } from '@/features/admin/tableConfigs';
import AdminForm from '@/features/admin/components/AdminForm';
import styles from '../page.module.css';

interface Department {
  id: number;
  name: string;
  country_name: string;
}

export default function NewCityPage() {
  const router = useRouter();
  const [departments, setDepartments] = useState<Department[]>([]);

  // Fetch departments for the select dropdown
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const { supabase } = await import('@/shared/api/supabase');
        const { data, error } = await supabase
          .from('departments')
          .select(`
            id,
            name,
            countries!inner(name)
          `)
          .order('name');
        if (!error && data) {
          setDepartments(data.map((d: any) => ({
            id: d.id,
            name: d.name,
            country_name: d.countries?.name || 'Desconocido',
          })));
        }
      } catch (err) {
        console.error('Error fetching departments:', err);
      }
    };
    fetchDepartments();
  }, []);

  // Update config with department options
  const configWithDepartments = {
    ...citiesConfig,
    columns: citiesConfig.columns.map(col => 
      col.name === 'department_id' 
        ? { ...col, options: departments.map(d => ({ value: String(d.id), label: `${d.name} (${d.country_name})` })) }
        : col
    ),
  };

  const handleSubmit = async (formData: Record<string, any>) => {
    const res = await fetch('/api/admin/cities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    if (result.error) throw new Error(result.error);
    router.push('/admin/cities');
    router.refresh();
  };

  const handleCancel = () => {
    router.push('/admin/cities');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>
            <FaBuilding className={styles.icon} /> Nueva Ciudad
          </h1>
          <p className={styles.subtitle}>Añade una nueva ciudad</p>
        </div>
      </header>

      <AdminForm
        config={configWithDepartments.columns}
        initialData={{}}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Crear"
        title="Nueva Ciudad"
      />
    </div>
  );
}