'use client';

import { useState, useEffect, useCallback } from 'react';
import { FaPlus, FaTrashCan, FaLink } from 'react-icons/fa6';
import { adminReadService } from '@/features/admin/services';
import { artistSocialsConfig } from '@/features/admin/tableConfigs';
import { AdminTable, ConfirmModal } from '@/features/admin/components';
import AdminForm from '@/features/admin/components/AdminForm';
import Button from '@/shared/ui/Button/Button';
import styles from './page.module.css';

interface Artist {
  id: number;
  name: string;
}

interface ArtistSocial {
  id: number;
  artist_id: number;
  artist_name: string;
  platform: string;
  url: string;
  created_at: string;
  artists?: { name: string }[] | { name: string } | null;
}

export default function ArtistSocialsPage() {
  const [data, setData] = useState<ArtistSocial[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 20, total: 0 });
  const [sort, setSort] = useState({ column: 'created_at', ascending: false });
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ArtistSocial | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; bulk?: boolean } | null>(null);

  // Fetch artists for the select dropdown
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const { supabase } = await import('@/shared/api/supabase');
        const { data, error } = await supabase
          .from('artists')
          .select('id, name')
          .order('name');
        if (!error && data) {
          setArtists(data);
        }
      } catch (err) {
        console.error('Error fetching artists:', err);
      }
    };
    fetchArtists();
  }, []);

  // Update config with artist options
  const configWithArtists = {
    ...artistSocialsConfig,
    columns: artistSocialsConfig.columns.map(col => 
      col.name === 'artist_id' 
        ? { ...col, options: artists.map(a => ({ value: String(a.id), label: a.name })) }
        : col
    ),
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Use a custom query to join artist name
      const { supabase } = await import('@/shared/api/supabase');
      const page = pagination.page;
      const pageSize = pagination.pageSize;
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from('artist_socials')
        .select(`
          id,
          artist_id,
          platform,
          url,
          created_at,
          artists!inner(name)
        `, { count: 'exact' });

      // Apply filters
      if (filters.artist_id) {
        query = query.eq('artist_id', filters.artist_id);
      }
      if (filters.platform) {
        query = query.eq('platform', filters.platform);
      }

      // Apply search
      if (search) {
        query = query.or(`platform.ilike.%${search}%,url.ilike.%${search}%,artists.name.ilike.%${search}%`);
      }

      // Apply sort
      const sortColumn = sort.column === 'artist_name' ? 'artists.name' : sort.column;
      query = query.order(sortColumn, { ascending: sort.ascending });

      // Apply pagination
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw new Error(error.message);

      // Transform data to include artist_name
      const transformedData = (data || []).map((item: any) => {
        const artistsData = item.artists as { name: string }[] | { name: string } | null;
        const artistName = Array.isArray(artistsData) 
          ? artistsData[0]?.name 
          : artistsData?.name;
        return {
          ...item,
          artist_name: artistName || 'Desconocido',
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
      const res = await fetch('/api/admin/artist_socials', {
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
      const res = await fetch(`/api/admin/artist_socials/${editingItem.id}`, {
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
        const res = await fetch('/api/admin/artist_socials/bulk', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: selectedIds }),
        });
        const result = await res.json();
        if (result.error) throw new Error(result.error);
        setSelectedIds([]);
      } else {
        const res = await fetch(`/api/admin/artist_socials/${deleteConfirm.id}`, {
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

  const openEditForm = (item: ArtistSocial) => {
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
            <FaLink className={styles.icon} /> {artistSocialsConfig.displayNamePlural}
          </h1>
          <p className={styles.subtitle}>{artistSocialsConfig.description}</p>
        </div>
        <Button onClick={openCreateForm}>
          <FaPlus /> Nueva Red Social
        </Button>
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
        config={configWithArtists}
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
        searchPlaceholder="Buscar por artista, plataforma o URL..."
        emptyMessage="No hay redes sociales registradas"
      />

      {showForm && (
        <AdminForm
          config={configWithArtists.columns}
          initialData={editingItem || {}}
          onSubmit={editingItem ? handleUpdate : handleCreate}
          onCancel={closeForm}
          submitLabel={editingItem ? 'Actualizar' : 'Crear'}
          title={editingItem ? `Editar ${artistSocialsConfig.displayName}` : `Nueva ${artistSocialsConfig.displayName}`}
          loading={submitting}
        />
      )}
    </div>
  );
}