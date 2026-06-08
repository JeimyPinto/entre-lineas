'use client';

import { useState, useEffect, useCallback } from 'react';
import { FaPlus, FaTrashCan, FaFlag } from 'react-icons/fa6';
import { adminReadService } from '@/features/admin/services';
import { countriesConfig } from '@/features/admin/tableConfigs';
import { AdminTable, ConfirmModal } from '@/features/admin/components';
import AdminForm from '@/features/admin/components/AdminForm';
import Button from '@/shared/ui/Button/Button';
import styles from './page.module.css';

interface Country {
  id: number;
  code: string;
  name: string;
  has_departments: boolean;
  created_at: string;
}

export default function CountriesPage() {
  const [data, setData] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 20, total: 0 });
  const [sort, setSort] = useState({ column: 'name', ascending: true });
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Country | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; bulk?: boolean } | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await adminReadService.getAll<Country>(countriesConfig, {
        pagination: { page: pagination.page, pageSize: pagination.pageSize },
        sort,
        filters,
        search,
      });
      setData(result.data);
      setPagination(prev => ({ ...prev, total: result.total }));
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
      const res = await fetch('/api/admin/countries', {
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
      const res = await fetch(`/api/admin/countries/${editingItem.id}`, {
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
        const res = await fetch('/api/admin/countries/bulk', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: selectedIds }),
        });
        const result = await res.json();
        if (result.error) throw new Error(result.error);
        setSelectedIds([]);
      } else {
        const res = await fetch(`/api/admin/countries/${deleteConfirm.id}`, {
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

  const openEditForm = (item: Country) => {
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
            <FaFlag className={styles.icon} /> {countriesConfig.displayNamePlural}
          </h1>
          <p className={styles.subtitle}>{countriesConfig.description}</p>
        </div>
        <Button onClick={openCreateForm}>
          <FaPlus /> Nuevo País
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
        config={countriesConfig}
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
        searchPlaceholder="Buscar por código o nombre..."
        emptyMessage="No hay países registrados"
      />

      {showForm && (
        <AdminForm
          config={countriesConfig.columns}
          initialData={editingItem || {}}
          onSubmit={editingItem ? handleUpdate : handleCreate}
          onCancel={closeForm}
          submitLabel={editingItem ? 'Actualizar' : 'Crear'}
          title={editingItem ? `Editar ${countriesConfig.displayName}` : `Nuevo ${countriesConfig.displayName}`}
          loading={submitting}
        />
      )}

      <ConfirmModal
        isOpen={!!deleteConfirm}
        onClose={cancelDelete}
        onConfirm={executeDelete}
        title={deleteConfirm?.bulk ? 'Eliminar selección' : 'Eliminar país'}
        message={deleteConfirm?.bulk 
          ? `¿Eliminar ${selectedIds.length} países? Esta acción no se puede deshacer.`
          : '¿Eliminar este país? Esta acción no se puede deshacer.'}
        confirmLabel={deleteConfirm?.bulk ? 'Eliminar todo' : 'Eliminar'}
        variant="danger"
        loading={submitting}
      />
    </div>
  );
}