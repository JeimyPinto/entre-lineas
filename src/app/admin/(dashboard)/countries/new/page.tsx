'use client';

import { useRouter } from 'next/navigation';
import { FaPlus, FaFlag } from 'react-icons/fa6';
import { countriesConfig } from '@/features/admin/tableConfigs';
import AdminForm from '@/features/admin/components/AdminForm';
import styles from '../page.module.css';

export default function NewCountryPage() {
  const router = useRouter();

  const handleSubmit = async (formData: Record<string, any>) => {
    const res = await fetch('/api/admin/countries', {
      method: 'POST',
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

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>
            <FaFlag className={styles.icon} /> Nuevo País
          </h1>
          <p className={styles.subtitle}>Añade un nuevo país al sistema</p>
        </div>
      </header>

      <AdminForm
        config={countriesConfig.columns}
        initialData={{}}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Crear"
        title="Nuevo País"
      />
    </div>
  );
}