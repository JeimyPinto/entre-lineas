# Guía de API y Datos

## API Routes

### `GET /api/youtube` — Proxy YouTube Data API

Obtiene datos del canal de YouTube protegiedo la API key del cliente.

**Respuesta:**

```json
{
  "shorts": [{ "id": "string", "title": "string", "thumbnail": "string", "viewCount": "number" }],
  "videos": [{ "id": "string", "title": "string", "thumbnail": "string", "viewCount": "number", "likeCount": "number", "commentCount": "number" }],
  "subscriberCount": 12345,
  "highlights": {
    "viral": { "id": "string", "title": "string", "viewCount": "number" },
    "mostLiked": { "id": "string", "title": "string", "likeCount": "number" },
    "mostCommented": { "id": "string", "title": "string", "commentCount": "number" }
  }
}
```

**Lógica:**
- **Shorts**: duración < 2 minutos
- **Videos**: duración >= 2 minutos
- **Highlights**: cálculo automático del más viral, más likeado y más comentado
- En **desarrollo** retorna datos mock (`src/data/youtube_mock.json`) para ahorrar cuota

### `POST /api/admin/login` — Login legacy (fallback)

Autenticación por username/password contra variables de entorno. Reemplazado por Server Actions + Supabase Auth.

### `POST /api/admin/password/reset` — Solicitar recuperación de contraseña

Envía email de recuperación usando Supabase Auth.

**Parámetros (formData):**
- `email` — Email del usuario

**Respuesta:**
```json
{ "success": true }
```

**Lógica:**
- Usa `NEXT_PUBLIC_SITE_URL` o `VERCEL_URL` para construir el link de recuperación
- Soporta desarrollo local y producción

### `POST /api/admin/password/update` — Actualizar contraseña

Actualiza la contraseña del usuario autenticado.

**Parámetros (formData):**
- `password` — Nueva contraseña
- `confirmPassword` — Confirmación de contraseña

**Respuesta:**
```json
{ "success": true }
```

**Validaciones:**
- Mínimo 6 caracteres
- Las contraseñas deben coincidir
- Requiere sesión activa de Supabase Auth

### `GET|POST|PUT|DELETE /api/admin/artists` — CRUD Artistas (legacy)

Operaciones CRUD sobre `public/data/artists.json`. En escritura regenera también `src/data/artists.ts` para fallback estático en producción.

### `POST /api/admin/upload` — Subida de imágenes

Recibe archivo + artist ID, procesa con sharp (resize 640×800, cover crop, WebP 90%), guarda en `public/artists/[id].webp` y actualiza el JSON.

## Server Actions (Reemplazan API Routes para mutaciones)

| Acción | Archivo | Descripción |
|---|---|---|
| `loginAction` | `authActions.ts` | Login con Supabase Auth |
| `logoutAction` | `authActions.ts` | Logout + revalidate + redirect |
| `createArtistAction` | `artistActions.ts` | Crear artista (con upload opcional de imagen) |
| `updateArtistAction` | `artistActions.ts` | Actualizar artista |
| `deleteArtistAction` | `artistActions.ts` | Eliminar artista |
| `createEventAction` | `eventActions.ts` | Crear evento |

## Datos Estáticos

| Archivo | Contenido |
|---|---|
| `src/data/artists.ts` | Array de artistas con fallback estático para producción |
| `src/data/events.ts` | 25 eventos (ediciones 1–25, Oct 2023 – Mar 2026) |
| `src/data/contact.ts` | Información de contacto (email, WhatsApp, redes) |
| `src/data/history.ts` | Contenido de línea de tiempo (4 capítulos) |
| `src/data/locations.ts` | Catálogo de países y departamentos de Colombia |
| `src/data/youtube_mock.json` | Mock de respuesta YouTube para desarrollo |
| `public/data/artists.json` | JSON de artistas para fetch cliente (regenerado en escritura) |

## Supabase Schema

### Tabla: `artists`
| Columna | Tipo | Detalle |
|---|---|---|
| `id` | BIGINT PK | Auto-generado |
| `name` | TEXT | NOT NULL |
| `org_role` | TEXT[] | Roles del artista |
| `image` | TEXT | URL de imagen |
| `image_position` | TEXT | Posición vertical (default `'50%'`) |
| `profession` | TEXT | Profesión |
| `origin` | TEXT | Origen |
| `trajectory` | TEXT | Trayectoria |
| `bio` | TEXT[] | Biografía por párrafos |
| `socials` | JSONB | Redes sociales |
| `created_at` | TIMESTAMPTZ | Default NOW() |
| `created_by` | UUID | FK → auth.users(id) |

### Tabla: `events`
| Columna | Tipo | Detalle |
|---|---|---|
| `id` | BIGINT PK | Número de edición |
| `title` | TEXT | NOT NULL |
| `date` | TEXT | NOT NULL |
| `location` | TEXT | Lugar del evento |
| `post_url` | TEXT | URL Instagram |
| `youtube_link` | TEXT | URL YouTube |
| `judges` | JSONB | Array de jueces |
| `host` | JSONB | Array de hosts |
| `created_at` | TIMESTAMPTZ | Default NOW() |

**RLS**: SELECT público; INSERT/UPDATE/DELETE solo para usuarios autenticados.

## Tipos de Entidades

### `Artist` (`src/entities/artist/types.ts`)

```typescript
interface SocialLink {
  platform: 'instagram' | 'youtube' | 'facebook' | 'web' | 'tiktok' | 'other';
  url: string;
  label: string;
}

interface Artist {
  id?: string;
  alias: string; // Nombre artístico/apodo
  name: string; // Nombre real
  orgRole: string[]; // Rol en la organización (Juez, Host, Fundador)
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  imagePosition?: string; // Porcentaje vertical (ej. '50%')
  profession: string; // Profesión/Ocupación
  origin: string; // Ciudad de origen
  trajectory: string; // Tiempo en la escena (ej. 'Desde 2019')
  bio: string[]; // Biografía por párrafos
  socials: SocialLink[];
}
```

### `Event` (`src/entities/event/types.ts`)

```typescript
interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  postUrl: string;
  youtubeLink?: string;
  judges: { name: string; image?: string; artistId?: string }[];
  host?: { name: string; image?: string; artistId?: string }[];
}
```

### `AuthUser` (`src/features/auth/services.ts`)

```typescript
interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}
```

## Servicios

### `artistService` (`src/features/artists/services.ts`)

| Método | Descripción | Autenticación |
|---|---|---|
| `getAll()` | Obtiene todos los artistas ordenados por nombre | No |
| `getById(id)` | Obtiene un artista por ID | No |
| `create(artistData)` | Crea un nuevo artista | Sí |
| `update(id, updates)` | Actualiza un artista | Sí |
| `delete(id)` | Elimina un artista | Sí |
| `uploadImage(file)` | Sube imagen a storage y retorna URL | Sí |

### `eventService` (`src/features/events/services.ts`)

| Método | Descripción | Autenticación |
|---|---|---|
| `getAll()` | Obtiene todos los eventos ordenados por ID descendente | No |
| `create(eventData)` | Crea un nuevo evento | Sí |

### `authService` (`src/features/auth/services.ts`)

| Método | Descripción |
|---|---|
| `login(email, password)` | Inicia sesión con Supabase Auth y guarda cookie de sesión |
| `logout()` | Cierra sesión y elimina cookie |
| `getCurrentUser()` | Obtiene el usuario actual desde Supabase Auth |
| `isAuthenticated()` | Verifica si hay sesión activa |

## Supabase Storage

### Buckets

| Bucket | Propósito | Acceso |
|---|---|---|
| `artists` | Imágenes de perfiles de artistas | Público lectura; Admin escritura |

**Estructura de archivos:**
- Perfiles: `profiles/[random]-[timestamp].[ext]`

## Variables de Entorno

| Variable | Descripción | Requerido |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase | Sí |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima pública de Supabase | Sí |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave de servicio para operaciones server-side | Sí |
| `YOUTUBE_API_KEY` | API key de YouTube Data API v3 | Sí (producción) |
| `YOUTUBE_CHANNEL_ID` | ID del canal de YouTube | Sí (producción) |
| `NEXT_PUBLIC_SITE_URL` | URL del sitio para emails de recuperación | Recomendado |
| `YOUTUBE_SKIP_MOCK` | Si es `true`, usa API real en desarrollo | Opcional |
