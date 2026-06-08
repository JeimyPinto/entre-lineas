/**
 * Configuraciones de tablas para el admin genérico
 * Define columnas, validaciones, y comportamiento UI para cada tabla
 */

import { TableConfig, ColumnConfig } from './types';
import { FaLink, FaUser, FaGlobe, FaClock, FaDatabase, FaTrashCan, FaFlag, FaLocationDot, FaBuilding } from 'react-icons/fa6';

// ============================================
// CONFIGURACIÓN: artist_socials
// ============================================

const socialPlatforms = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'web', label: 'Web' },
  { value: 'other', label: 'Otro' },
];

export const artistSocialsConfig: TableConfig = {
  tableName: 'artist_socials',
  displayName: 'Red Social',
  displayNamePlural: 'Redes Sociales de Artistas',
  primaryKey: 'id',
  icon: <FaLink />,
  description: 'Gestiona los enlaces a redes sociales de cada artista',
  defaultSort: { column: 'created_at', ascending: false },
  defaultPageSize: 20,
  searchableColumns: ['platform', 'url', 'artist_name'],
  sortableColumns: ['id', 'artist_name', 'platform', 'created_at'],
  columns: [
    {
      name: 'id',
      label: 'ID',
      type: 'number',
      visibleInTable: true,
      visibleInForm: false,
      isPrimaryKey: true,
      readOnly: true,
      width: '60px',
      align: 'center',
    },
    {
      name: 'artist_name',
      label: 'Artista',
      type: 'text',
      visibleInTable: true,
      visibleInForm: false,
      readOnly: true,
      width: '180px',
    },
    {
      name: 'artist_id',
      label: 'Artista',
      type: 'select',
      visibleInTable: false,
      visibleInForm: true,
      required: true,
      options: [], // Se llena dinámicamente
      width: '200px',
      helpText: 'Selecciona el artista',
    },
    {
      name: 'platform',
      label: 'Plataforma',
      type: 'select',
      visibleInTable: true,
      visibleInForm: true,
      required: true,
      options: socialPlatforms,
      width: '140px',
    },
    {
      name: 'url',
      label: 'URL',
      type: 'url',
      visibleInTable: true,
      visibleInForm: true,
      required: true,
      placeholder: 'https://...',
      helpText: 'Enlace completo al perfil',
    },
    {
      name: 'created_at',
      label: 'Creado',
      type: 'datetime',
      visibleInTable: true,
      visibleInForm: false,
      readOnly: true,
      width: '160px',
      align: 'center',
    },
  ],
};

// ============================================
// CONFIGURACIÓN: youtube_cache
// ============================================

export const youtubeCacheConfig: TableConfig = {
  tableName: 'youtube_cache',
  displayName: 'Cache YouTube',
  displayNamePlural: 'Cache de YouTube',
  primaryKey: 'id',
  icon: <FaDatabase />,
  description: 'Visualiza y limpia el cache de la API de YouTube',
  defaultSort: { column: 'updated_at', ascending: false },
  defaultPageSize: 20,
  searchableColumns: ['id'],
  sortableColumns: ['id', 'updated_at'],
  columns: [
    {
      name: 'id',
      label: 'Clave Cache',
      type: 'text',
      visibleInTable: true,
      visibleInForm: false,
      isPrimaryKey: true,
      readOnly: true,
      width: '200px',
      format: (value) => <code className="font-mono text-xs">{value}</code>,
    },
    {
      name: 'data',
      label: 'Datos (JSON)',
      type: 'json',
      visibleInTable: false, // Muy grande para tabla
      visibleInForm: true,
      readOnly: true,
      helpText: 'Datos cacheados en formato JSON',
    },
    {
      name: 'updated_at',
      label: 'Actualizado',
      type: 'datetime',
      visibleInTable: true,
      visibleInForm: false,
      readOnly: true,
      width: '180px',
      align: 'center',
    },
  ],
  rowActions: [
    {
      key: 'view',
      label: 'Ver datos',
      icon: <FaGlobe size={14} />,
      variant: 'ghost',
      onClick: (row) => {
        // Abrir modal con JSON formateado
        alert(JSON.stringify(row.data, null, 2));
      },
    },
    {
      key: 'delete',
      label: 'Eliminar',
      icon: <FaTrashCan size={14} />,
      variant: 'danger',
      onClick: async (row) => {
        if (confirm(`¿Eliminar cache "${row.id}"?`)) {
          // Se manejará desde la página
        }
      },
    },
  ],
};

// ============================================
// CONFIGURACIÓN: countries
// ============================================

export const countriesConfig: TableConfig = {
  tableName: 'countries',
  displayName: 'País',
  displayNamePlural: 'Países',
  primaryKey: 'id',
  icon: <FaFlag />,
  description: 'Gestiona los países disponibles en el sistema',
  defaultSort: { column: 'name', ascending: true },
  defaultPageSize: 20,
  searchableColumns: ['code', 'name'],
  sortableColumns: ['id', 'code', 'name', 'has_departments', 'created_at'],
  columns: [
    {
      name: 'id',
      label: 'ID',
      type: 'number',
      visibleInTable: true,
      visibleInForm: false,
      isPrimaryKey: true,
      readOnly: true,
      width: '60px',
      align: 'center',
    },
    {
      name: 'code',
      label: 'Código ISO',
      type: 'text',
      visibleInTable: true,
      visibleInForm: true,
      required: true,
      placeholder: 'CO',
      helpText: 'Código ISO 3166-1 alpha-2 (2 letras)',
      width: '100px',
      validate: (value: string) => value.length === 2 ? null : 'Debe ser 2 letras',
    },
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      visibleInTable: true,
      visibleInForm: true,
      required: true,
      placeholder: 'Colombia',
      width: '200px',
    },
    {
      name: 'has_departments',
      label: 'Tiene Departamentos',
      type: 'boolean',
      visibleInTable: true,
      visibleInForm: true,
      helpText: 'Si el país tiene subdivisiones (departamentos/estados/provincias)',
    },
    {
      name: 'created_at',
      label: 'Creado',
      type: 'datetime',
      visibleInTable: true,
      visibleInForm: false,
      readOnly: true,
      width: '160px',
      align: 'center',
    },
  ],
};

// ============================================
// CONFIGURACIÓN: departments
// ============================================

export const departmentsConfig: TableConfig = {
  tableName: 'departments',
  displayName: 'Departamento',
  displayNamePlural: 'Departamentos',
  primaryKey: 'id',
  icon: <FaLocationDot />,
  description: 'Gestiona los departamentos/estados/provincias por país',
  defaultSort: { column: 'name', ascending: true },
  defaultPageSize: 20,
  searchableColumns: ['code', 'name'],
  sortableColumns: ['id', 'code', 'name', 'country_id', 'created_at'],
  columns: [
    {
      name: 'id',
      label: 'ID',
      type: 'number',
      visibleInTable: true,
      visibleInForm: false,
      isPrimaryKey: true,
      readOnly: true,
      width: '60px',
      align: 'center',
    },
    {
      name: 'country_id',
      label: 'País',
      type: 'select',
      visibleInTable: true,
      visibleInForm: true,
      required: true,
      options: [], // Se llena dinámicamente
      width: '180px',
      helpText: 'País al que pertenece el departamento',
    },
    {
      name: 'code',
      label: 'Código',
      type: 'text',
      visibleInTable: true,
      visibleInForm: true,
      required: true,
      placeholder: 'ANT',
      helpText: 'Código del departamento (ej. ANT, CAL, CUN)',
      width: '100px',
    },
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      visibleInTable: true,
      visibleInForm: true,
      required: true,
      placeholder: 'Antioquia',
      width: '200px',
    },
    {
      name: 'created_at',
      label: 'Creado',
      type: 'datetime',
      visibleInTable: true,
      visibleInForm: false,
      readOnly: true,
      width: '160px',
      align: 'center',
    },
  ],
};

// ============================================
// CONFIGURACIÓN: cities
// ============================================

export const citiesConfig: TableConfig = {
  tableName: 'cities',
  displayName: 'Ciudad',
  displayNamePlural: 'Ciudades',
  primaryKey: 'id',
  icon: <FaBuilding />,
  description: 'Gestiona las ciudades por departamento',
  defaultSort: { column: 'name', ascending: true },
  defaultPageSize: 20,
  searchableColumns: ['name'],
  sortableColumns: ['id', 'name', 'department_id', 'created_at'],
  columns: [
    {
      name: 'id',
      label: 'ID',
      type: 'number',
      visibleInTable: true,
      visibleInForm: false,
      isPrimaryKey: true,
      readOnly: true,
      width: '60px',
      align: 'center',
    },
    {
      name: 'department_id',
      label: 'Departamento',
      type: 'select',
      visibleInTable: true,
      visibleInForm: true,
      required: true,
      options: [], // Se llena dinámicamente
      width: '200px',
      helpText: 'Departamento al que pertenece la ciudad',
    },
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      visibleInTable: true,
      visibleInForm: true,
      required: true,
      placeholder: 'Medellín',
      width: '200px',
    },
    {
      name: 'created_at',
      label: 'Creado',
      type: 'datetime',
      visibleInTable: true,
      visibleInForm: false,
      readOnly: true,
      width: '160px',
      align: 'center',
    },
  ],
};

// ============================================
// EXPORTAR TODAS LAS CONFIGURACIONES
// ============================================

export const adminTableConfigs: Record<string, TableConfig> = {
  artist_socials: artistSocialsConfig,
  youtube_cache: youtubeCacheConfig,
  countries: countriesConfig,
  departments: departmentsConfig,
  cities: citiesConfig,
};

export function getTableConfig(tableName: string): TableConfig | undefined {
  return adminTableConfigs[tableName];
}