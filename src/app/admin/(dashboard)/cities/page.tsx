'use client';

import { useState, useEffect, useCallback } from 'react';
import { FaPlus, FaTrashCan, FaBuilding } from 'react-icons/fa6';
import { adminReadService } from '@/features/admin/services';
import { citiesConfig } from '@/features/admin/tableConfigs';
import { AdminTable, ConfirmModal } from '@/features/admin/components';
import AdminForm from '@/features/admin/components/AdminForm';
import Button from '@/shared/ui/Button/Button';
import styles from './page.module.css';

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
}

export default function CitiesPage() {
  const [data, setData] = useState<City[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 20, total: 0 });
  const [sort, setSort] = useState({ column: 'name', ascending: true });
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<City | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; bulk?: boolean } | null>(null);

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

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Use a custom query to join department and country names
      const { supabase } = await import('@/shared/api/supabase');
      const page = pagination.page;
      const pageSize = pagination.pageSize;
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
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
        `, { count: 'exact' });

      // Apply filters
      if (filters.department_id) {
        query = query.eq('department_id', filters.department_id);
      }

      // Apply search
      if (search) {
        query = query.or(`name.ilike.%${search}%,departments.name.ilike.%${search}%,departments.countries.name.ilike.%${search}%`);
      }

      // Apply sort
      const sortColumn = sort.column === 'department_name' ? 'departments.name' : 
                         sort.column === 'country_name' ? 'departments.countries.name' : sort.column;
      query = query.order(sortColumn, { ascending: sort.ascending });

      // Apply pagination
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw new Error(error.message);

      // Transform data to include department_name and country_name
      const transformedData = (data || []).map((item: any) => {
        const departmentsData = item.departments as { 
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

        return {
          ...item,
          department_name: departmentName || 'Desconocido',
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
      const res = await fetch('/api/admin/cities', {
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
      const res = await fetch(`/api/admin/cities/${editingItem.id}`, {
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
        const res = await fetch('/api/admin/cities/bulk', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: selectedIds }),
        });
        const result = await res.json();
        if (result.error) throw new Error(result.error);
        setSelectedIds([]);
      } else {
        const res = await fetch(`/api/admin/cities/${deleteConfirm.id}`, {
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

  const openEditForm = (item: City) => {
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
            <FaBuilding className={styles.icon} /> {citiesConfig.displayNamePlural}
          </h1>
          <p className={styles.subtitle}>{citiesConfig.description}</p>
        </div>
        <Button onClick={openCreateForm}>
          <FaPlus /> Nueva Ciudad
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
        config={configWithDepartments}
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
        searchPlaceholder="Buscar por ciudad, departamento o país..."
        emptyMessage="No hay ciudades registradas"
      />

      {showForm && (
        <AdminForm
          config={configWithDepartments.columns}
          initialData={editingItem || {}}
          onSubmit={editingItem ? handleUpdate : handleCreate}
          onCancel={closeForm}
          submitLabel={editingItem ? 'Actualizar' : 'Crear'}
          title={editingItem ? `Editar ${citiesConfig.displayName}` : `Nueva ${citiesConfig.displayName}`}
          loading={submitting}
        />
      )}

      <ConfirmModal
        isOpen={!!deleteConfirm}
        onClose={cancelDelete}
        onConfirm={executeDelete}
        title={deleteConfirm?.bulk ? 'Eliminar selección' : 'Eliminar ciudad'}
        message={deleteConfirm?.bulk 
          ? `¿Eliminar ${selectedIds.length} ciudades? Esta acción no se puede deshacer.`
          : '¿Eliminar esta ciudad? Esta acción no se puede deshacer.'}
        confirmLabel={deleteConfirm?.bulk ? 'Eliminar todo' : 'Eliminar'}
        variant="danger"
        loading={submitting}
      />
    </div>
  );
}