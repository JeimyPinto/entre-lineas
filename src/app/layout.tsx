import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { LazyScript } from "@/shared/ui/LazyScript";
import DeferredStyle from "@/shared/ui/DeferredStyle/DeferredStyle";

// Read critical CSS at build time
const criticalCssPath = path.join(process.cwd(), "src/shared/styles/critical.css");
const criticalCss = fs.existsSync(criticalCssPath) ? fs.readFileSync(criticalCssPath, "utf-8") : "";

export const metadata: Metadata = {
  title: "Entre Lineas",
  description: "Plataforma Web de Entre Lineas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: 'dark' }}>
      <head>
        {/* Critical CSS inlined for LCP - eliminates render-blocking */}
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
        {/* Preload hero logo images for LCP optimization */}
        <link rel="preload" href="/1-01.png" as="image" type="image/png" fetchPriority="high" />
        <link rel="preload" href="/1-02.png" as="image" type="image/png" fetchPriority="high" />
        <link rel="preload" href="/1-03.png" as="image" type="image/png" fetchPriority="high" />
        <link rel="preload" href="/1-04.png" as="image" type="image/png" fetchPriority="high" />
        {/* Preload critical font for hero text */}
        <link rel="preload" href="/fonts/CloisterBlack.ttf" as="font" type="font/ttf" crossOrigin="anonymous" fetchPriority="high" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        {/* Non-critical CSS loaded deferred (after initial render) */}
        <DeferredStyle href="/styles/global.css" id="global-styles" />
        {/* Third-party scripts loaded on user interaction (not blocking initial render) */}
        <LazyScript
          src="https://gist.github.com/devinschumacher/6cbd52c082040f0e4c414836aebdb36f.js"
          id="css-reset-script"
          fallbackTimeout={3000}
        />
        <LazyScript
          src="https://www.instagram.com/embed.js"
          id="instagram-embed-script"
          fallbackTimeout={3000}
        />
        {/* Add GTM here when needed:
        <LazyScript
          src="https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXX"
          id="gtm-script"
          fallbackTimeout={3000}
        />
        */}
      </body>
    </html>
  );
}
