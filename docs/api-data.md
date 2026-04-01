
# API y Datos

- **Endpoint principal:** `/api/youtube` (Next.js API Route)

- **Formato de respuesta:**

```json
{
  "shorts": [ ... ],
  "videos": [ ... ],
  "subscriberCount": 12345
}
```

- **Lógica de separación:**
  - Shorts: videos con duración menor a 2 minutos.
  - Videos: videos con duración igual o mayor a 2 minutos.
  - subscriberCount: número de suscriptores del canal.
