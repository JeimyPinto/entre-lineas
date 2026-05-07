# Entre Líneas — Plataforma Artística

![Entre Líneas Logo](/1-01.png)

Plataforma oficial del colectivo **Entre Líneas**, diseñada para proyectar y difundir el talento colombiano (freestylers, músicos y artistas urbanos) mediante una experiencia web moderna, modular y dinámica.

Basado en Manizales, Colombia. 25+ ediciones de eventos documentadas.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router, Server Components, Server Actions) |
| UI | React 19, CSS Modules, framer-motion 12 |
| Backend | Supabase (PostgreSQL, Auth, Storage) |
| API Externa | YouTube Data API v3 |
| Assets | sharp (procesamiento de imágenes), react-icons |

---

## Características

- **Galería YouTube** — Videos y shorts del canal, highlights automáticos (más viral, likeado, comentado)
- **Artistas** — Grid con filtros por rol, modal de detalle, fotos, biografías y redes
- **Eventos** — 25 ediciones documentadas con jueces, hosts y enlaces a Instagram/YouTube
- **Historia** — Línea de tiempo animada (Orígenes, Filosofía, Estructura, Visión)
- **Panel Admin** — CRUD completo de artistas y eventos con autenticación Supabase
- **Dark UI** — Diseño oscuro con glassmorphism, tipografía Cloister + Esteban
- **Responsive** — Desktop-first con menú móvil, carruseles táctiles, grids adaptativos

---

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Landing page (hero, galería, artistas, eventos, contacto, footer) |
| `/admin` | Login / Dashboard / CRUD artistas y eventos / Branding showcase |

---

## Estructura del Proyecto

```
src/
├── app/                  # Rutas, layouts, API routes, Server Actions
│   ├── actions/          #   Server Actions (auth, artist, event CRUD)
│   └── api/              #   API Routes (youtube, admin/crud, upload)
├── components/           # Componentes públicos + UI system
│   └── ui/               #   Design System (Button, Card, Input, etc.)
├── hooks/                # Custom hooks (useYouTubeData, useInterval, useMediaQuery)
├── services/             # Capa de servicios (auth, artist, event)
├── models/               # Modelos con mapeo DB ↔ app
├── types/                # Interfaces TypeScript
├── data/                 # Datos estáticos y mock
└── styles/               # Tokens de diseño y estilos globales
docs/                     # Documentación detallada
public/
├── artists/              # Imágenes de artistas
├── fonts/                # Tipografías (CloisterBlack)
└── data/                 # JSON de artistas (fallback producción)
supabase/
└── migrations/           # Schema SQL
```

---

## Instalación

```bash
npm install
```

### Variables de Entorno (`.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
YOUTUBE_API_KEY=tu_api_key
YOUTUBE_CHANNEL_ID=UColw-XWA4S-yN9SLKnL31xQ
```

### Desarrollo

```bash
npm run dev        # next dev
npm run build      # next build
npm run lint       # next lint
```

### Supabase

```bash
npm run db:link    # npx supabase link --project-ref paywsuxfzsoeunettwuj
npm run db:push    # npx supabase db push
npm run db:seed    # npx supabase db query --linked -f supabase/seed.sql
```

---

## Documentación

| Documento | Contenido |
|---|---|
| 📊 [PRD — Requerimientos del Proyecto](./docs/prd.md) | Objetivos, contexto, requerimientos funcionales y no funcionales |
| 🎨 [Sistema de Diseño y UX/UI](./docs/design.md) | Paleta de colores, tipografía, principios de diseño, accesibilidad |
| ⚙️ [Stack Técnico y Arquitectura](./docs/technologies.md) | Tecnologías, componentes, hooks, servicios, modelos |
| 📡 [Guía de API y Datos](./docs/api-data.md) | Endpoints, Server Actions, esquema Supabase, datos estáticos |

---

## Despliegue

Optimizado para **Vercel** con funciones serverless para el proxy de YouTube y soporte nativo de Server Actions y Server Components.

---

Desarrollado por Jeimy Tatiana Pinto Tapia para el colectivo Entre Líneas.
