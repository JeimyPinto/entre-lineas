'use client';

import { useState, useMemo, useCallback } from 'react';
import { 
  FaMagnifyingGlass, 
  FaChevronUp, 
  FaChevronDown, 
  FaChevronLeft, 
  FaChevronRight,
  FaCheck,
  FaXmark
} from 'react-icons/fa6';
import styles from './AdminTable.module.css';
import { TableConfig, ColumnConfig, PaginationState, SortState, FilterState } from '../types';

export interface AdminTableProps<T extends Record<string, any>> {
  config: TableConfig;
  data: T[];
  loading: boolean;
  pagination: PaginationState;
  sort: SortState;
  filters: FilterState;
  selectedIds: string[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSortChange: (column: string) => void;
  onFilterChange: (filters: FilterState) => void;
  onSearchChange: (search: string) => void;
  onSelectionChange: (ids: string[]) => void;
  onRowClick?: (row: T) => void;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

export function AdminTable<T extends Record<string, any>>({
  config,
  data,
  loading,
  pagination,
  sort,
  filters,
  selectedIds,
  onPageChange,
  onPageSizeChange,
  onSortChange,
  onFilterChange,
  onSearchChange,
  onSelectionChange,
  onRowClick,
  searchPlaceholder = 'Buscar...',
  emptyMessage = 'No hay datos disponibles',
}: AdminTableProps<T>) {
  const [search, setSearch] = useState('');
  const [localFilters, setLocalFilters] = useState<FilterState>({});
  const [showFilterRow, setShowFilterRow] = useState(false);

  const visibleColumns = useMemo(
    () => config.columns.filter(col => col.visibleInTable !== false),
    [config.columns]
  );

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearchChange(value);
  }, [onSearchChange]);

  const handleFilterChange = useCallback((column: string, value: any) => {
    const newFilters = { ...localFilters, [column]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  }, [localFilters, onFilterChange]);

  const handleSort = useCallback((column: string) => {
    if (!config.sortableColumns.includes(column)) return;
    onSortChange(column);
  }, [config.sortableColumns, onSortChange]);

  const handleSelectAll = useCallback(() => {
    if (selectedIds.length === data.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(data.map(row => String(row[config.primaryKey])));
    }
  }, [data, config.primaryKey, selectedIds.length, onSelectionChange]);

  const handleSelectRow = useCallback((id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter(s => s !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  }, [selectedIds, onSelectionChange]);

  const formatValue = useCallback((value: any, column: ColumnConfig, row: T) => {
    if (column.format) {
      return column.format(value, row);
    }

    if (value === null || value === undefined) {
      return <span className={styles.nullValue}>—</span>;
    }

    switch (column.type) {
      case 'boolean':
        return (
          <span className={styles.booleanBadge}>
            {value ? 'Sí' : 'No'}
          </span>
        );
      case 'date':
        return new Date(value).toLocaleDateString('es-CO');
      case 'datetime':
        return new Date(value).toLocaleString('es-CO');
      case 'json':
        return <pre className={styles.jsonValue}>{JSON.stringify(value, null, 2)}</pre>;
      case 'image':
        return <img src={value} alt="" className={styles.imagePreview} />;
      case 'url':
        return <a href={value} target="_blank" rel="noopener noreferrer" className={styles.urlLink}>{value}</a>;
      default:
        return String(value);
    }
  }, []);

  if (loading) {
    return (
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.selectCol} style={{ width: '40px' }} />
              {visibleColumns.map(col => (
                <th key={col.name} style={{ width: col.width }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className={styles.skeletonRow}>
                <td />
                {visibleColumns.map(col => (
                  <td key={col.name}><div className={styles.skeleton} /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <div className={styles.searchWrapper}>
            <FaMagnifyingGlass className={styles.searchIcon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder={searchPlaceholder}
              value={search}
              onChange={handleSearch}
              autoComplete="off"
            />
          </div>
          <button
            className={styles.filterToggle}
            onClick={() => setShowFilterRow(!showFilterRow)}
          >
            {showFilterRow ? <FaXmark size={16} /> : <FaMagnifyingGlass size={16} />}
            Filtros
          </button>
        </div>
        <div className={styles.toolbarRight}>
          <select
            className={styles.pageSizeSelect}
            value={pagination.pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {[10, 20, 50, 100].map(size => (
              <option key={size} value={size}>{size} por página</option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Row */}
      {showFilterRow && (
        <div className={styles.filterRow}>
          {visibleColumns.map(col => (
            <div key={col.name} className={styles.filterCell}>
              {col.type === 'boolean' ? (
                <select
                  className={styles.filterSelect}
                  value={localFilters[col.name] || ''}
                  onChange={(e) => handleFilterChange(col.name, e.target.value === 'true' ? true : e.target.value === 'false' ? false : undefined)}
                  autoComplete="off"
                >
                  <option value="">Todos</option>
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
              ) : col.type === 'select' && col.options ? (
                <select
                  className={styles.filterSelect}
                  value={localFilters[col.name] || ''}
                  onChange={(e) => handleFilterChange(col.name, e.target.value || undefined)}
                  autoComplete="off"
                >
                  <option value="">Todos</option>
                  {col.options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className={styles.filterInput}
                  placeholder={`Filtrar ${col.label}`}
                  value={localFilters[col.name] || ''}
                  onChange={(e) => handleFilterChange(col.name, e.target.value || undefined)}
                  autoComplete="off"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.selectCol} style={{ width: '40px' }}>
                <input
                  type="checkbox"
                  checked={selectedIds.length === data.length && data.length > 0}
                  onChange={handleSelectAll}
                  className={styles.selectAll}
                  ref={(el) => {
                    if (el) {
                      el.indeterminate = selectedIds.length > 0 && selectedIds.length < data.length;
                    }
                  }}
                />
              </th>
              {visibleColumns.map(col => (
                <th
                  key={col.name}
                  style={{ 
                    width: col.width,
                    textAlign: col.align || 'left',
                  }}
                >
                  {config.sortableColumns.includes(col.name) ? (
                    <button
                      type="button"
                      className={styles.sortButton}
                      onClick={() => handleSort(col.name)}
                      aria-sort={sort.column === col.name ? (sort.ascending ? 'ascending' : 'descending') : 'none'}
                    >
                      <div className={styles.headerContent}>
                        <span>{col.label}</span>
                        {sort.column === col.name && (
                          <span className={styles.sortIcon} aria-hidden="true">
                            {sort.ascending ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                          </span>
                        )}
                      </div>
                    </button>
                  ) : (
                    <div className={styles.headerContent}>
                      <span>{col.label}</span>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={visibleColumns.length + 1} className={styles.emptyCell}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => {
                const id = String(row[config.primaryKey]);
                const isSelected = selectedIds.includes(id);
                return (
                  <tr
                    key={id}
                    className={`${styles.row} ${isSelected ? styles.selected : ''} ${rowIndex % 2 === 0 ? styles.even : styles.odd}`}
                    onClick={() => onRowClick?.(row)}
                  >
                    <td className={styles.selectCol}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(id)}
                        onClick={(e) => e.stopPropagation()}
                        className={styles.rowSelect}
                      />
                    </td>
                    {visibleColumns.map(col => (
                      <td
                        key={col.name}
                        style={{ textAlign: col.align || 'left' }}
                        className={col.isPrimaryKey ? styles.primaryKey : ''}
                      >
                        {formatValue(row[col.name], col, row)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <div className={styles.paginationInfo}>
          Mostrando {((pagination.page - 1) * pagination.pageSize) + 1} - {Math.min(pagination.page * pagination.pageSize, pagination.total)} de {pagination.total}
        </div>
        <div className={styles.paginationControls}>
          <button
            className={styles.pageBtn}
            onClick={() => onPageChange(1)}
            disabled={pagination.page === 1}
            aria-label="Primera página"
          >
            <FaChevronLeft size={16} />
          </button>
          <button
            className={styles.pageBtn}
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            aria-label="Página anterior"
          >
            <FaChevronLeft size={16} />
          </button>
          <span className={styles.pageInfo}>
            Página {pagination.page} de {Math.ceil(pagination.total / pagination.pageSize) || 1}
          </span>
          <button
            className={styles.pageBtn}
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page >= Math.ceil(pagination.total / pagination.pageSize)}
            aria-label="Página siguiente"
          >
            <FaChevronRight size={16} />
          </button>
          <button
            className={styles.pageBtn}
            onClick={() => onPageChange(Math.ceil(pagination.total / pagination.pageSize))}
            disabled={pagination.page >= Math.ceil(pagination.total / pagination.pageSize)}
            aria-label="Última página"
          >
            <FaChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}