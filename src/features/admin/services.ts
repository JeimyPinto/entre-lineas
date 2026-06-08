/**
 * Servicio genérico de administración para Supabase
 * Versión cliente (solo lectura) - usa cliente anónimo
 * Para mutaciones, usar Server Actions o API Routes
 */

import { supabase as supabaseAnon } from '@/shared/api/supabase';
import { TableConfig, ColumnConfig } from './types';

interface PaginationOptions {
  page: number;
  pageSize: number;
}

interface SortOptions {
  column: string;
  ascending: boolean;
}

interface FilterOptions {
  [key: string]: any;
}

interface ListResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Cliente de solo lectura - seguro para componentes cliente
 * Usa el cliente anónimo de Supabase
 */
export const adminReadService = {
  /**
   * Obtiene todos los registros de una tabla con paginación, ordenamiento y filtros
   */
  async getAll<T = Record<string, any>>(
    tableConfig: TableConfig,
    options: {
      pagination?: PaginationOptions;
      sort?: SortOptions;
      filters?: FilterOptions;
      search?: string;
    } = {}
  ): Promise<ListResult<T>> {
    const { pagination, sort, filters, search } = options;
    const page = pagination?.page ?? 1;
    const pageSize = pagination?.pageSize ?? tableConfig.defaultPageSize ?? 20;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabaseAnon.from(tableConfig.tableName).select('*', { count: 'exact' });

    // Aplicar filtros
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          query = query.eq(key, value);
        }
      });
    }

    // Aplicar búsqueda en columnas searchable
    if (search && tableConfig.searchableColumns.length > 0) {
      const searchConditions = tableConfig.searchableColumns
        .map(col => `${col}.ilike.%${search}%`)
        .join(',');
      query = query.or(searchConditions);
    }

    // Aplicar ordenamiento
    const sortColumn = sort?.column ?? tableConfig.defaultSort?.column ?? tableConfig.primaryKey;
    const ascending = sort?.ascending ?? tableConfig.defaultSort?.ascending ?? false;
    query = query.order(sortColumn, { ascending });

    // Aplicar paginación
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error(`[adminReadService.getAll] Error en ${tableConfig.tableName}:`, error.message);
      throw new Error(error.message);
    }

    return {
      data: (data as T[]) || [],
      total: count ?? 0,
      page,
      pageSize,
    };
  },

  /**
   * Obtiene un registro por su ID
   */
  async getById<T = Record<string, any>>(
    tableConfig: TableConfig,
    id: string
  ): Promise<T | null> {
    const { data, error } = await supabaseAnon
      .from(tableConfig.tableName)
      .select('*')
      .eq(tableConfig.primaryKey, id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No encontrado
      console.error(`[adminReadService.getById] Error en ${tableConfig.tableName}:`, error.message);
      throw new Error(error.message);
    }

    return data as T;
  },

  /**
   * Cuenta total de registros (para paginación sin cargar datos)
   */
  async count(tableConfig: TableConfig, filters: FilterOptions = {}): Promise<number> {
    let query = supabaseAnon.from(tableConfig.tableName).select('*', { count: 'exact', head: true });

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query = query.eq(key, value);
      }
    });

    const { count, error } = await query;

    if (error) {
      console.error(`[adminReadService.count] Error en ${tableConfig.tableName}:`, error.message);
      throw new Error(error.message);
    }

    return count ?? 0;
  },
};

/**
 * Tipos para Server Actions de escritura
 * Estos se usan en Server Actions, no directamente en componentes cliente
 */
export type AdminWriteOperations = {
  create: <T>(tableConfig: TableConfig, data: Partial<T>) => Promise<T>;
  update: <T>(tableConfig: TableConfig, id: string, data: Partial<T>) => Promise<T>;
  delete: (tableConfig: TableConfig, id: string) => Promise<void>;
  bulkDelete: (tableConfig: TableConfig, ids: string[]) => Promise<void>;
};

/**
 * Mapea tipos de Postgres a tipos de columna del admin
 */
export function mapPostgresTypeToColumnType(pgType: string): ColumnConfig['type'] {
  const typeMap: Record<string, ColumnConfig['type']> = {
    'uuid': 'text',
    'bigint': 'number',
    'integer': 'number',
    'smallint': 'number',
    'text': 'text',
    'varchar': 'text',
    'character varying': 'text',
    'boolean': 'boolean',
    'date': 'date',
    'timestamp with time zone': 'datetime',
    'timestamp without time zone': 'datetime',
    'timestamptz': 'datetime',
    'jsonb': 'json',
    'json': 'json',
    'numeric': 'number',
    'real': 'number',
    'double precision': 'number',
  };
  return typeMap[pgType.toLowerCase()] || 'text';
}