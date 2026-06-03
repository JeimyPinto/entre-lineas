# Guía de Despliegue - Migración Admin Users

## Resumen de cambios

La migración `20260420000000_clean_admin_users.sql`:

1. **Limpia el campo `role` obsoleto** de `raw_user_meta_data`
2. **Guarda solo `name` y `alias`** (útiles para mostrar en el admin)
3. **Simplifica el acceso**: cualquier usuario en `auth.users` con credenciales válidas puede acceder

## Cómo ejecutar

### Opción 1: Desde Supabase Dashboard

1. Ve a **SQL Editor** en tu proyecto Supabase
2. Copia y pega el contenido de `20260420000000_clean_admin_users.sql`
3. Ejecuta la consulta

### Opción 2: Desde CLI

```bash
supabase db push
```

## Verificación

Después de ejecutar, verifica que no queden usuarios con role:

```sql
SELECT id, email, raw_user_meta_data->>'role' as role
FROM auth.users
WHERE raw_user_meta_data->>'role' IS NOT NULL;
-- Debe retornar 0 filas
```

## Acceso al Admin

El sistema usa el middleware en `src/proxy.ts`:

- Si hay **sesión activa** → acceso al dashboard
- Si **NO hay sesión** → redirigido a login

Para agregar un nuevo admin:

1. Crea el usuario en Supabase Auth (puede ser desde el panel o API)
2. El usuario puede iniciar sesión en `/admin/login`

No se necesita configurar nada adicional - cualquier usuario autenticado tiene acceso.
