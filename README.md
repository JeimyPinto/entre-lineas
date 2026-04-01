# 🖋️ Entre Líneas | Plataforma Artística

![Entre Líneas Logo](/1-01.png)

Plataforma oficial del proyecto **Entre Líneas**, diseñada para proyectar y difundir el talento colombiano (músicos, freestylers y artistas) mediante una experiencia web premium, modular y dinámica.

---

## 🚀 Arquitectura y Tecnologías

Este proyecto ha sido rediseñado bajo una arquitectura **Modular y Escalable**, garantizando que el mantenimiento y crecimiento de la plataforma sea fluido.

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router & Server Actions).
- **Estilos**: [CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules) para un encapsulamiento total.
- **Datos**: Integración dinámica con la [YouTube Data API v3](https://developers.google.com/youtube/v3).
- **Estado**: Custom Hooks para la gestión de datos asíncronos y conectividad.
- **UI System**: Librería de componentes propia (`/ui`) que garantiza coherencia visual (Design System).

---

## ✨ Características (Highlights)

- **Premium Dark UI**: Paleta de colores curada (Negro, Blanco, Rojo profundo) con efectos de **Glassmorphism**.
- **YouTube Integration**: Seguimiento en tiempo real de videos, shorts y estadísticas (suscriptores).
- **Hitos Dinámicos**: Cálculo automático de los videos más virales y comentados del canal.
- **Responsive Pro**: Experiencia optimizada para móviles con navegación fluida y carruseles táctiles.
- **SEO Friendly**: Estructura semántica para mejorar el posicionamiento del colectivo.

---

## 📁 Estructura del Proyecto

```bash
src/
 ├── app/              # Rutas y API (Next.js App Router)
 ├── components/       # Componentes de negocio
 │    └── ui/          # Elementos básicos reutilizables (Design System)
 ├── hooks/            # Lógica de datos y utilidades
 ├── styles/           # Tokens de diseño y estilos globales
 └── types/            # Centralización de interfaces TypeScript
```

---

## 🛠️ Instalación y Desarrollo

1. **Clonar el repositorio:**
   ```bash
   git clone [link-del-repo]
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Variables de Entorno:**
   Crea un archivo `.env.local` y añade tus credenciales de Google Cloud:
   ```env
   YOUTUBE_API_KEY=tu_api_key
   YOUTUBE_CHANNEL_ID=UColw-XWA4S-yN9SLKnL31xQ
   ```

4. **Ejecutar en local:**
   ```bash
   npm run dev
   ```

---

## 📖 Documentación Detallada

Para profundizar en aspectos específicos del proyecto, consulta nuestra base de conocimientos:

- 📊 [Objetivos del Proyecto (PRD)](./docs/prd.md)
- 🎨 [Sistema de Diseño y UX/UI](./docs/design.md)
- ⚙️ [Stack Técnico y Arquitectura](./docs/technologies.md)
- 📡 [Guía de API y Datos](./docs/api-data.md)

---

## 🌐 Despliegue

La plataforma está optimizada para desplegarse en **Vercel** con un solo clic, soportando funciones servidor para la API de YouTube.

---

Desarrollado con ❤️ para el talento colombiano.
