# TODO - Reestructuración a Feature-Sliced Design (FSD) - COMPLETADO ✓

## Phase 1: Crear estructura FSD base - COMPLETADO ✓
- [x] Estructura src/entities/ existente
- [x] Estructura src/features/ existente
- [x] Estructura src/shared/ existente

## Phase 2: Mover entidades (entities/) - COMPLETADO ✓
- [x] src/entities/artist/types.ts, model.ts, data.ts
- [x] src/entities/event/types.ts, model.ts
- [x] src/entities/user/types.ts
- [x] src/entities/youtube-video/types.ts

## Phase 3: Mover características (features/) - COMPLETADO ✓
- [x] src/features/artists/services.ts, api/route.ts
- [x] src/features/auth/services.ts, api/route.ts
- [x] src/features/events/services.ts
- [x] src/features/youtube/api/route.ts, hooks/useYouTubeData.ts

## Phase 4: Mover compartido (shared/) - COMPLETADO ✓
- [x] src/shared/api/supabase.ts, supabaseServer.ts
- [x] src/shared/hooks/useInterval.ts, useMediaQuery.ts
- [x] src/shared/styles/global.css
- [x] src/shared/utils/imageUtils.ts

## Phase 5: Mover data estático - COMPLETADO ✓
- [x] src/entities/artist/data.ts (ya estaba en FSD)

## Phase 6: Actualizar imports - COMPLETADO ✓
- [x] ArtistCard.tsx actualizado a @/entities/artist/types
- [x] gallery.tsx actualizado a @/features/youtube/hooks/useYouTubeData

## Phase 7: Limpiar estructura antigua - COMPLETADO ✓
- [x] Eliminados: src/types/, src/models/, src/services/, src/data/, src/lib/, src/styles/, src/utils/, src/hooks/
