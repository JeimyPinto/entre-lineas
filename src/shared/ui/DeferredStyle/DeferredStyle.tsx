"use client";

import { useEffect, useState } from "react";

export interface DeferredStyleProps {
  /** URL del CSS a cargar de forma diferida */
  href: string;
  /** ID opcional para el link element */
  id?: string;
  /** Atributos adicionales */
  attrs?: Record<string, string>;
  /** Callback cuando el CSS se carga */
  onLoad?: () => void;
  /** Callback si hay error */
  onError?: (error: Event | string) => void;
}

/**
 * Componente para cargar CSS no crítico de forma diferida.
 * Usa el patrón media="print" onload="this.media='all'" para evitar bloquear el render.
 * 
 * @example
 * <DeferredStyle href="/styles/global.css" id="global-styles" />
 */
export default function DeferredStyle({
  href,
  id,
  attrs = {},
  onLoad,
  onError,
}: DeferredStyleProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Event | string | null>(null);

  useEffect(() => {
    // Verificar si ya existe un link con este href o id
    const existingLink = id 
      ? document.getElementById(id) as HTMLLinkElement | null
      : document.querySelector(`link[href="${href}"]`) as HTMLLinkElement | null;

    if (existingLink) {
      if (existingLink.media === "all") {
        setLoaded(true);
        onLoad?.();
      } else {
        // Ya está cargando, esperar a que termine
        const handleLoad = () => {
          setLoaded(true);
          onLoad?.();
          existingLink.removeEventListener("load", handleLoad);
          existingLink.removeEventListener("error", handleError);
        };
        const handleError = (e: Event) => {
          setError(e);
          onError?.(e);
          existingLink.removeEventListener("load", handleLoad);
          existingLink.removeEventListener("error", handleError);
        };
        existingLink.addEventListener("load", handleLoad);
        existingLink.addEventListener("error", handleError);
      }
      return;
    }

    // Crear link element
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.media = "print"; // No bloquea render
    if (id) link.id = id;

    // Atributos adicionales
    Object.entries(attrs).forEach(([key, value]) => {
      link.setAttribute(key, value);
    });

    const handleLoad = () => {
      link.media = "all"; // Cambiar a all tras cargar
      setLoaded(true);
      onLoad?.();
      link.removeEventListener("load", handleLoad);
      link.removeEventListener("error", handleError);
    };

    const handleError = (e: Event) => {
      setError(e);
      onError?.(e);
      link.removeEventListener("load", handleLoad);
      link.removeEventListener("error", handleError);
    };

    link.addEventListener("load", handleLoad);
    link.addEventListener("error", handleError);

    document.head.appendChild(link);

    return () => {
      link.removeEventListener("load", handleLoad);
      link.removeEventListener("error", handleError);
      // No removemos el link del DOM para evitar FOUC en navegación
    };
  }, [href, id, attrs, onLoad, onError]);

  // No renderiza nada visible
  return null;
}