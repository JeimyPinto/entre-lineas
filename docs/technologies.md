# Stack Técnico y Arquitectura

## Tecnologías Principales

| Tecnología | Versión | Propósito |
|---|---|---|
| **Next.js** | 16 (App Router) | Framework full-stack con Server Components y Server Actions |
| **TypeScript** | 5 | Tipado estático |
| **React** | 19 | UI declarativa |
| **Supabase** | SSR 0.10 + JS 2.103 | Base de datos PostgreSQL, Auth, Storage |
| **framer-motion** | 12 | Animaciones declarativas |
| **sharp** | 0.34 | Procesamiento de imágenes (server-side) |
| **react-icons** | 5 | Iconos SVG |
| **YouTube Data API v3** | — | Datos del canal (videos, shorts, estadísticas) |

## Arquitectura

```
Frontend (Next.js 16 SSR/SSG)
    ↕ Server Actions / API Routes
Backend (Supabase: PostgreSQL + Auth + Storage)
    ↕
Cliente (Navegador)
```

- **Server Components**: Renderizado en servidor para data fetching (páginas públicas).
- **Client Components**: Interactividad (formularios, galería, modales, animaciones).
- **Server Actions**: Mutaciones seguras (login, CRUD artistas/eventos).
- **API Routes**: Proxy YouTube (protege API key), upload de imágenes, CRUD legacy.

## Features

| Feature | Descripción |
|---|---|
| **Galería de YouTube** | Videos y shorts del canal, con tabs, estadísticas y highlights |
| **Sección de Artistas** | Grid filtrable por rol, cards con modal detalle |
| **Eventos** | Línea de tiempo de eventos/ediciones |
| **Historia** | Línea de tiempo animada del colectivo |
| **Admin - Login** | Autenticación con Supabase Auth, recuperación de contraseña |
| **Admin - Artistas** | CRUD completo de artistas con imágen |
| **Admin - Eventos** | Gestión de eventos con jueces y hosts |
| **Admin - Upload** | Procesamiento de imágenes con sharp |

## Componentes del Sistema

### Públicos (`src/components/`)
- `Header` — Nav sticky con logo animado, menú desktop/mobile
- `NavMenu` / `MenuButton` — Menú móvil overlay
- `MainSection` — Hero con logo rotatorio, highlights de YouTube, redes sociales
- `Gallery` / `GalleryItem` / `GalleryModal` — Galería de videos con tabs (Videos/Shorts)
- `YouTubeIframe` / `SuscribeBanner` — Reproductor embebido + llamado a suscripción
- `HistorySection` — Línea de tiempo animada (Orígenes, Filosofía, Estructura, Visión)
- `ArtistSection` / `ArtistCard` — Grid de artistas con filtros por rol y modal detalle
- `EventsSection` — Grid de eventos con tarjetas estilo Instagram
- `Contact` — Sección de contacto (email, WhatsApp, redes)
- `Footer` — Pie de página con navegación y redes

### UI System (`src/components/ui/`)
- `Button` — Polimórfico (link/ancla/botón), variantes y tamaños
- `Card` — Contenedor reutilizable con header opcional
- `Input` — Campo de formulario con label y estado de error
- `TagSelector` — Selector multietiqueta para roles
- `LocationSelector` — Selector jerárquico (país → depto → ciudad)
- `YearSelector` — Selector de año (trayectoria)
- `ImageUploader` — Drag & drop + preview + slider de posición vertical
- `InstagramCard` — Tarjeta de evento con avatares de jueces/hosts
- `BlinkingLogo` — Logo de ojo con parpadeo aleatorio

### Admin (`src/app/admin/`)
- Login con Supabase Auth (email/contraseña)
- Dashboard con cards de acceso rápido
- CRUD de Artistas (crear, editar, eliminar)
- CRUD de Eventos (crear, eliminar)
- Branding showcase (paleta, tipografía, logos, componentes)

### Hooks (`src/shared/hooks/`)
- `useYouTubeData` — Fetch datos de YouTube con detección online/offline
- `useInterval` — setInterval declarativo (patrón Dan Abramov)
- `useMediaQuery` — Detección de media queries CSS

### Servicios (`src/features/`)
- `authService` — login/logout/getCurrentUser con Supabase Auth
- `artistService` — CRUD artistas (público: anon, escritura: autenticado)
- `eventService` — CRUD eventos (mismo patrón de auth)

### Modelos (`src/entities/`)
- `Artist.fromDb()` / `.toDb()` — Conversión entre DB (snake_case) y app (camelCase)
- `Event.fromDb()` / `.toDb()` — Ídem
- `User.fromSupabase()` — Mapeo de usuario Supabase a perfil de app

## Base de Datos

### Tablas

| Tabla | Descripción |
|---|---|
| `artists` | Catálogo de artistas con información personal, rol, imagen y redes |
| `events` | Eventos/ediciones con jueces, hosts y enlaces |

### Storage Buckets

| Bucket | Propósito |
|---|---|
| `artists` | Imágenes de perfiles de artistas |

### Variables de Entorno

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima pública |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave de servicio |
| `YOUTUBE_API_KEY` | API key de YouTube |
| `YOUTUBE_CHANNEL_ID` | ID del canal de YouTube |
| `NEXT_PUBLIC_SITE_URL` | URL del sitio (para emails) |
