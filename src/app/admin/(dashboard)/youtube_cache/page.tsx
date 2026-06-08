'use client';

import { useState, useEffect, useCallback } from 'react';
import { FaTrashCan, FaDatabase, FaEye, FaRotateRight } from 'react-icons/fa6';
import { adminReadService } from '@/features/admin/services';
import { youtubeCacheConfig } from '@/features/admin/tableConfigs';
import { AdminTable } from '@/features/admin/components';
import AdminForm from '@/features/admin/components/AdminForm';
import Button from '@/shared/ui/Button/Button';
import styles from './page.module.css';

interface YouTubeCache {
  id: string;
  data: any;
  updated_at: string;
}

export default function YouTubeCachePage() {
  const [data, setData] = useState<YouTubeCache[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 20, total: 0 });
  const [sort, setSort] = useState({ column: 'updated_at', ascending: false });
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<YouTubeCache | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await adminReadService.getAll<YouTubeCache>(youtubeCacheConfig, {
        pagination: { page: pagination.page, pageSize: pagination.pageSize },
        sort,
        filters,
        search,
      });
      setData(result.data);
      setPagination(prev => ({ ...prev, total: result.total }));
    } catch (err: any) {
      setError(err.message || 'Error cargando cache');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.pageSize, sort, filters, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/youtube?refresh=true');
      const result = await res.json();
      if (result.error) throw new Error(result.error);
      fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setRefreshing(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`¿Eliminar entrada de cache "${id}"?`)) return;
    try {
      const res = await fetch(`/api/admin/youtube_cache/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (result.error) throw new Error(result.error);
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`¿Eliminar ${selectedIds.length} entradas de cache?`)) return;
    try {
      const res = await fetch('/api/admin/youtube_cache/bulk', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds }),
      });
      const result = await res.json();
      if (result.error) throw new Error(result.error);
      setSelectedIds([]);
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const openViewForm = (item: YouTubeCache) => {
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
            <FaDatabase className={styles.icon} /> {youtubeCacheConfig.displayNamePlural}
          </h1>
          <p className={styles.subtitle}>{youtubeCacheConfig.description}</p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="ghost" onClick={handleRefresh} disabled={refreshing}>
            <FaRotateRight /> {refreshing ? 'Refrescando...' : 'Refrescar Cache'}
          </Button>
        </div>
      </header>

      {error && (
        <div className={styles.error}>
          {error}
          <button onClick={() => setError(null)} className={styles.errorClose}>×</button>
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
        config={youtubeCacheConfig}
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
        onRowClick={openViewForm}
        searchPlaceholder="Buscar por clave de cache..."
        emptyMessage="No hay entradas en el cache"
      />

      {showForm && editingItem && (
        <AdminForm
          config={youtubeCacheConfig.columns}
          initialData={editingItem}
          onSubmit={async () => {}} // Solo lectura
          onCancel={closeForm}
          submitLabel="Cerrar"
          title={`Cache: ${editingItem.id}`}
          loading={false}
        />
      )}
    </div>
  );
}