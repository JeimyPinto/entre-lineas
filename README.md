
# Entre Líneas

Proyecto web realizado con [Next.js](https://nextjs.org), sin frameworks de estilos externos. Todos los estilos se gestionan con CSS nativo en el archivo `src/app/globals.css`.

## Estructura

- `src/app/` : Páginas y estilos globales (`globals.css`).
- `src/components/` : Componentes reutilizables.
- `public/` : Imágenes, fuentes y archivos estáticos.

## Instalación y desarrollo

Instala las dependencias:

```bash
npm install
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Personalización de estilos

Todos los estilos se encuentran en `src/app/globals.css`. Puedes modificar este archivo para adaptar el diseño según tus necesidades.

## Tecnologías principales

- Next.js
- React
- CSS nativo

## Despliegue

Puedes desplegar el proyecto fácilmente en [Vercel](https://vercel.com/new).

Consulta la [documentación de Next.js sobre despliegue](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
