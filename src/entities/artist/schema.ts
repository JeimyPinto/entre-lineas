/**
 * Validador simple para datos de artista
 * Valida que los datos requeridos existan y tengan el formato correcto
 */

/**
 * Valida un string, retorna string vacío si es null/undefined
 */
export function safeString(value: string | null | undefined): string {
  return value ?? '';
}

/**
 * Valida un array de strings, retorna array vacío si es null/undefined
 */
export function safeStringArray(value: string | null | undefined): string[] {
  if (!value) return [];
  return value.split(',').map((r) => r.trim()).filter(Boolean);
}

/**
 * Valida que un string no esté vacío
 */
export function required(value: string | null | undefined, fieldName: string): string | null {
  const str = safeString(value);
  if (!str.trim()) {
    return `${fieldName} requerido`;
  }
  return null;
}

/**
 * Validador para artista
 */
export interface ValidationResult {
  success: boolean;
  errors: string[];
}

/**
 * Valida datos básicos de artista
 */
export function validateArtist(data: {
  alias: string | null | undefined;
  name: string | null | undefined;
  orgRole: string | null | undefined;
}): ValidationResult {
  const errors: string[] = [];

  const aliasError = required(data.alias, 'Alias');
  if (aliasError) errors.push(aliasError);

  const nameError = required(data.name, 'Nombre');
  if (nameError) errors.push(nameError);

  const roles = safeStringArray(data.orgRole);
  if (roles.length === 0) {
    errors.push('Al menos un rol requerido');
  }

  return {
    success: errors.length === 0,
    errors,
  };
}

// Compatibilidad con código existente
export function safeValidateArtistData(data: unknown) {
  const d = data as { alias?: string; name?: string; orgRole?: string | string[] };
  const roles = typeof d.orgRole === 'string' ? d.orgRole : d.orgRole?.join(',') ?? '';
  return validateArtist({
    alias: d.alias,
    name: d.name,
    orgRole: roles,
  });
}

export const UpdateArtistSchema = {
  safeParse: () => ({ success: true, errors: [] as string[] }),
};
