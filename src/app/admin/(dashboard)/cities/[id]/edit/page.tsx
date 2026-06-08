'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaBuilding, FaPenToSquare } from 'react-icons/fa6';
import { adminReadService } from '@/features/admin/services';
import { citiesConfig } from '@/features/admin/tableConfigs';
import AdminForm from '@/features/admin/components/AdminForm';
import styles from '../../page.module.css';

interface Department {
  id: number;
  name: string;
  country_name: string;
}

interface City {
  id: number;
  department_id: number;
  department_name: string;
  country_name: string;
  name: string;
  created_at: string;
  departments?: { 
    name: string; 
    countries?: { name: string }[] | { name: string } | null 
  }[] | { 
    name: string; 
    countries?: { name: string }[] | { name: string } | null 
  } | null;
}

export default function EditCityPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [item, setItem] = useState<City | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { supabase } = await import('@/shared/api/supabase');
        const { data, error } = await supabase
          .from('cities')
          .select(`
            id,
            department_id,
            name,
            created_at,
            departments!inner(
              name,
              countries!inner(name)
            )
          `)
          .eq('id', id)
          .single();

        if (error) throw new Error(error.message);

        if (data) {
          const itemData = data as any;
          const departmentsData = itemData.departments as { 
            name: string; 
            countries?: { name: string }[] | { name: string } | null 
          }[] | { 
            name: string; 
            countries?: { name: string }[] | { name: string } | null 
          } | null;
          
          const departmentName = Array.isArray(departmentsData) 
            ? departmentsData[0]?.name 
            : departmentsData?.name;
          
          const countriesData = Array.isArray(departmentsData) 
            ? departmentsData[0]?.countries 
            : departmentsData?.countries;
          
          const countryName = Array.isArray(countriesData) 
            ? countriesData[0]?.name 
            : countriesData?.name;

          setItem({
            ...itemData,
            department_name: departmentName || 'Desconocido',
            country_name: countryName || 'Desconocido',
          });
        } else {
          setError('Ciudad no encontrada');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

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
    const res = await fetch(`/api/admin/cities/${id}`, {
      method: 'PUT',
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
            <FaBuilding className={styles.icon} /> Editar Ciudad
          </h1>
        </header>
        <div className={styles.error}>
          {error || 'Ciudad no encontrada'}
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
            <FaPenToSquare className={styles.icon} /> Editar Ciudad
          </h1>
          <p className={styles.subtitle}>Modifica los datos de la ciudad</p>
        </div>
      </header>

      <AdminForm
        config={configWithDepartments.columns}
        initialData={item}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Actualizar"
        title={`Editar: ${item.name}`}
      />
    </div>
  );
}