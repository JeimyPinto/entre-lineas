'use client';

import { useState, useEffect, useCallback } from 'react';
import { FaPlus, FaTrashCan, FaLocationDot } from 'react-icons/fa6';
import { adminReadService } from '@/features/admin/services';
import { departmentsConfig } from '@/features/admin/tableConfigs';
import { AdminTable, ConfirmModal } from '@/features/admin/components';
import AdminForm from '@/features/admin/components/AdminForm';
import Button from '@/shared/ui/Button/Button';
import styles from './page.module.css';

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
}

export default function DepartmentsPage() {
  const [data, setData] = useState<Department[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 20, total: 0 });
  const [sort, setSort] = useState({ column: 'name', ascending: true });
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Department | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; bulk?: boolean } | null>(null);

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

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Use a custom query to join country name
      const { supabase } = await import('@/shared/api/supabase');
      const page = pagination.page;
      const pageSize = pagination.pageSize;
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from('departments')
        .select(`
          id,
          country_id,
          code,
          name,
          created_at,
          countries!inner(name)
        `, { count: 'exact' });

      // Apply filters
      if (filters.country_id) {
        query = query.eq('country_id', filters.country_id);
      }
      if (filters.code) {
        query = query.eq('code', filters.code);
      }

      // Apply search
      if (search) {
        query = query.or(`code.ilike.%${search}%,name.ilike.%${search}%,countries.name.ilike.%${search}%`);
      }

      // Apply sort
      const sortColumn = sort.column === 'country_name' ? 'countries.name' : sort.column;
      query = query.order(sortColumn, { ascending: sort.ascending });

      // Apply pagination
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw new Error(error.message);

      // Transform data to include country_name
      const transformedData = (data || []).map((item: any) => {
        const countriesData = item.countries as { name: string }[] | { name: string } | null;
        const countryName = Array.isArray(countriesData) 
          ? countriesData[0]?.name 
          : countriesData?.name;
        return {
          ...item,
          country_name: countryName || 'Desconocido',
        };
      });

      setData(transformedData);
      setPagination(prev => ({ ...prev, total: count ?? 0 }));
    } catch (err: any) {
      setError(err.message || 'Error cargando datos');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.pageSize, sort, filters, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = async (formData: Record<string, any>) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/departments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.error) throw new Error(result.error);
      setShowForm(false);
      fetchData();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (formData: Record<string, any>) => {
    if (!editingItem) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/departments/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.error) throw new Error(result.error);
      setShowForm(false);
      setEditingItem(null);
      fetchData();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteConfirm({ id });
  };

  const handleBulkDelete = () => {
    setDeleteConfirm({ id: '', bulk: true });
  };

  const executeDelete = async () => {
    if (!deleteConfirm) return;
    
    setSubmitting(true);
    try {
      if (deleteConfirm.bulk) {
        const res = await fetch('/api/admin/departments/bulk', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: selectedIds }),
        });
        const result = await res.json();
        if (result.error) throw new Error(result.error);
        setSelectedIds([]);
      } else {
        const res = await fetch(`/api/admin/departments/${deleteConfirm.id}`, {
          method: 'DELETE',
        });
        const result = await res.json();
        if (result.error) throw new Error(result.error);
      }
      fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
      setDeleteConfirm(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const openCreateForm = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const openEditForm = (item: Department) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>
            <FaLocationDot className={styles.icon} /> {departmentsConfig.displayNamePlural}
          </h1>
          <p className={styles.subtitle}>{departmentsConfig.description}</p>
        </div>
        <Button onClick={openCreateForm}>
          <FaPlus /> Nuevo Departamento
        </Button>
      </header>

      {error && (
        <div className={styles.error} role="alert" aria-live="polite">
          {error}
          <button 
            onClick={() => setError(null)} 
            className={styles.errorClose}
            aria-label="Cerrar error"
          >×</button>
        </div>
      )}

      {selectedIds.length > 0 && (
        <div className={styles.bulkActions}>
          <span>{selectedIds.length} seleccionados</span>
          <Button variant="danger" onClick={handleBulkDelete}>
            <FaTrashCan /> Eliminar seleccionados
          </Button>
        </div>
      )}

      <AdminTable
        config={configWithCountries}
        data={data}
        loading={loading}
        pagination={pagination}
        sort={sort}
        filters={filters}
        selectedIds={selectedIds}
        onPageChange={(page) => setPagination(p => ({ ...p, page }))}
        onPageSizeChange={(size) => setPagination(p => ({ ...p, pageSize: size, page: 1 }))}
        onSortChange={(column) => setSort(s => ({ 
          column, 
          ascending: s.column === column ? !s.ascending : true 
        }))}
        onFilterChange={setFilters}
        onSearchChange={setSearch}
        onSelectionChange={setSelectedIds}
        onRowClick={openEditForm}
        searchPlaceholder="Buscar por país, código o nombre..."
        emptyMessage="No hay departamentos registrados"
      />

      {showForm && (
        <AdminForm
          config={configWithCountries.columns}
          initialData={editingItem || {}}
          onSubmit={editingItem ? handleUpdate : handleCreate}
          onCancel={closeForm}
          submitLabel={editingItem ? 'Actualizar' : 'Crear'}
          title={editingItem ? `Editar ${departmentsConfig.displayName}` : `Nuevo ${departmentsConfig.displayName}`}
          loading={submitting}
        />
      )}

      <ConfirmModal
        isOpen={!!deleteConfirm}
        onClose={cancelDelete}
        onConfirm={executeDelete}
        title={deleteConfirm?.bulk ? 'Eliminar selección' : 'Eliminar departamento'}
        message={deleteConfirm?.bulk 
          ? `¿Eliminar ${selectedIds.length} departamentos? Esta acción no se puede deshacer.`
          : '¿Eliminar este departamento? Esta acción no se puede deshacer.'}
        confirmLabel={deleteConfirm?.bulk ? 'Eliminar todo' : 'Eliminar'}
        variant="danger"
        loading={submitting}
      />
    </div>
  );
}