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
