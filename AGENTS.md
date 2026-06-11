# AGENTS.md — Entre Líneas

## Architecture

- **Next.js 16 App Router** — Server Components by default, Server Actions in `src/app/actions/`
- **Feature-Sliced Design**: `entities/` (types + models), `features/` (services + hooks), `shared/` (api clients + utils), `app/` (routes + actions)
- **Two DB layers**: Prisma 7 (migrations + admin CRUD) + Supabase JS client (public data, auth, storage)
- **Path aliases**: `@/` → `src/`, `@/types/*` → `src/entities/*/types.ts`

## Prisma 7 specifics

- Schema: `prisma/schema.prisma` uses `provider = "prisma-client-js"` with `engineType = "library"`
- Config: `prisma.config.ts` — uses `defineConfig` + `env()` from `prisma/config`
- Connection: requires `DATABASE_URL` env var; uses `@prisma/adapter-pg` `PrismaPg` adapter in `src/lib/prisma.ts`
- **Must run `npx prisma generate` before each build** (already in `vercel.json` build command)
- To regenerate: `npx prisma generate` (requires `DATABASE_URL`)

## Supabase clients

| File | Use | Import |
|---|---|---|
| `src/shared/api/supabase.ts` | Anon client (Proxy-based lazy init) | `import { supabase } from '@/shared/api/supabase'` |
| `src/shared/api/supabaseServer.ts` | Server client (cookie-based SSR) | `import { createClient } from '@/shared/api/supabaseServer'` |
| `src/shared/api/supabaseAdmin.ts` | Service-role admin client | — |

- Env vars: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (NOT `NEXT_PUBLIC_` — server-only)
- The `supabase` Proxy has `then` return `undefined` — **`await supabase` returns undefined**, do not await it

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Build (run `npx prisma generate` first) |
| `npm run lint` | ESLint (`next/core-web-vitals`, `next/typescript`) |
| `npm run db:link` | Link Supabase project |
| `npm run db:push` | Push Prisma schema to DB |
| `npm run db:seed` | Run `supabase/seed.sql` |
| `npm run deploy` | Deploy to Vercel preview |
| `npm run deploy:prod` | Deploy to Vercel production |

**Build order**: `npx prisma generate && npm run build`

## Key conventions

- **CSS Modules** for component styles + CSS custom properties for theming (see BLACKBOX.md for color/token reference)
- **react-window** for lists >50 items (`VirtualizedGrid` in `src/shared/ui/`)
- **framer-motion 12** for animations — used in client components
- **Server Actions** in `src/app/actions/` use `'use server'` directive, `revalidatePath`, `redirect`
- **YouTube API** proxied through `GET /api/youtube` (protects API key in `YOUTUBE_API_KEY`)

## Env vars (all required)

| Var | Notes |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin operations |
| `DATABASE_URL` | Prisma connection string (PostgreSQL) |
| `YOUTUBE_API_KEY` | YouTube Data API v3 |
| `YOUTUBE_CHANNEL_ID` | YouTube channel |
| `NEXT_PUBLIC_SITE_URL` | Site URL for emails |

## Gotchas

- `.env*` is gitignored — must be scafolded manually (check BLACKBOX.md for full list)
- No committed test files (`.test.ts`, `.spec.ts` in gitignore)
- `next lint` may fail without env vars — run with `.env.local` present
- Middleware file is deprecated in Next 16 — use `proxy` instead
- Available skills in `.agents/skills/`: `prisma-cli`, `vercel-react-best-practices`, `building-components`, `web-design-guidelines`

## Recent Updates (from other agent session)

- Fixed Supabase Client Initialization in `src/shared/api/supabase.ts`:
  - Replaced problematic proxy pattern that returned mock functions when credentials were missing
  - Fixed \"select is not a function\" errors by implementing proper client initialization
  - Added proper error handling for missing Supabase credentials
  - Ensured Edge Runtime compatibility by removing unsupported proxy usage
  
- Updated Auth Configuration in `src/auth.config.ts`:
  - Fixed NextAuth.js configuration for Next.js 16 App Router compatibility
  - Properly configured Supabase provider with correct client methods
  
- Enhanced Auth Utilities in `src/lib/auth-utils.ts`:
  - Improved session handling and token management
  - Fixed Edge Runtime compatibility issues
