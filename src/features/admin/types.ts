/**
 * Admin System Types
 * 
 * Composable types for the generic CRUD admin system.
 * Uses interface composition for state management.
 */

import { Identifiable } from '@/entities/shared/base';

// ============================================
// Column & Table Configuration
// ============================================

export type ColumnType = 
  | 'text' 
  | 'number' 
  | 'boolean' 
  | 'date' 
  | 'datetime' 
  | 'json' 
  | 'select' 
  | 'multiselect' 
  | 'image' 
  | 'url' 
  | 'email' 
  | 'textarea';

export interface ColumnConfig {
  /** Nombre de la columna en la BD */
  name: string;
  /** Etiqueta visible en UI */
  label: string;
  /** Tipo de dato para renderizado y validación */
  type: ColumnType;
  /** Si se muestra en la tabla de listado */
  visibleInTable?: boolean;
  /** Si se muestra en el formulario */
  visibleInForm?: boolean;
  /** Si es campo obligatorio */
  required?: boolean;
  /** Si es la clave primaria */
  isPrimaryKey?: boolean;
  /** Si es de solo lectura (ej. created_at) */
  readOnly?: boolean;
  /** Opciones para select/multiselect */
  options?: { value: string; label: string }[];
  /** Placeholder para inputs */
  placeholder?: string;
  /** Texto de ayuda */
  helpText?: string;
  /** Ancho en tabla (ej. '120px', '20%') */
  width?: string;
  /** Alineación en tabla */
  align?: 'left' | 'center' | 'right';
  /** Formateador personalizado para display en tabla */
  format?: (value: any, row: Record<string, any>) => React.ReactNode;
  /** Validador personalizado */
  validate?: (value: any) => string | null;
}

export interface TableConfig {
  /** Nombre de la tabla en Supabase */
  tableName: string;
  /** Nombre legible para UI */
  displayName: string;
  /** Nombre en plural para UI */
  displayNamePlural: string;
  /** Clave primaria */
  primaryKey: string;
  /** Columnas configuradas */
  columns: ColumnConfig[];
  /** Columnas por defecto para búsqueda */
  searchableColumns: string[];
  /** Columnas por defecto para ordenamiento */
  sortableColumns: string[];
  /** Orden por defecto */
  defaultSort?: { column: string; ascending: boolean };
  /** Paginación por defecto */
  defaultPageSize?: number;
  /** Icono para sidebar */
  icon?: React.ReactNode;
  /** Descripción de la tabla */
  description?: string;
  /** Permisos requeridos (futuro) */
  permissions?: string[];
  /** Acciones personalizadas por fila */
  rowActions?: RowAction[];
  /** Acciones en lote */
  bulkActions?: BulkAction[];
}

// ============================================
// Action Types
// ============================================

export interface RowAction {
  key: string;
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'danger' | 'ghost';
  onClick: (row: Record<string, any>) => void | Promise<void>;
  show?: (row: Record<string, any>) => boolean;
}

export interface BulkAction {
  key: string;
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'danger';
  onClick: (ids: string[]) => void | Promise<void>;
  confirmMessage?: string;
}

// ============================================
// State Composition
// ============================================

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface SortState {
  column: string;
  ascending: boolean;
}

export interface FilterState {
  [column: string]: any;
}

/** Core table state shared across features */
export interface TableStateCore {
  pagination: PaginationState;
  sort: SortState;
  filters: FilterState;
  selectedIds: string[];
}

/** Full admin table state with data and loading */
export interface AdminTableState extends TableStateCore {
  data: Record<string, any>[];
  loading: boolean;
  error: string | null;
}

/** Minimal state for table-only features */
export interface MinimalTableState extends TableStateCore {
  data: Record<string, any>[];
}

// ============================================
// Form & Page Props
// ============================================

export interface FormFieldProps {
  config: ColumnConfig;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  disabled?: boolean;
}

export interface AdminPageProps {
  tableConfig: TableConfig;
}

// ============================================
// Utility Types
// ============================================

/** Row data with required ID */
export interface AdminRow extends Identifiable {
  [key: string]: any;
}

/** Create form data (without ID) */
export type CreateFormData<T extends AdminRow> = Omit<T, 'id'>;

/** Update form data (with ID) */
export type UpdateFormData<T extends AdminRow> = Partial<T> & Pick<T, 'id'>;

/** Column keys for a table config */
export type ColumnKeys<T extends TableConfig> = T['columns'][number]['name'];

/** Extract row type from table config */
export type RowFromConfig<T extends TableConfig> = {
  [K in ColumnKeys<T>]: any;
} & Identifiable;