"use client";

import { useEffect, useState } from "react";

export interface LazyScriptProps {
  /** URL del script a cargar */
  src: string;
  /** ID opcional para el script */
  id?: string;
  /** Atributos adicionales para el script */
  attrs?: Record<string, string>;
  /** Eventos que disparan la carga (default: click, scroll, keydown) */
  triggerEvents?: string[];
  /** Timeout fallback en ms (default: 3000) */
  fallbackTimeout?: number;
  /** Callback cuando el script se carga */
  onLoad?: () => void;
  /** Callback si hay error */
  onError?: (error: Event | string) => void;
}

/**
 * Componente para cargar scripts de terceros (GTM, analytics, etc.) 
 * solo tras interacción del usuario o timeout.
 * 
 * Evita bloquear el main thread durante la carga inicial.
 * 
 * @example
 * <LazyScript 
 *   src="https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXX"
 *   id="gtm-script"
 *   triggerEvents={['click', 'scroll', 'keydown']}
 *   fallbackTimeout={3000}
 * />
 */
export default function LazyScript({
  src,
  id,
  attrs = {},
  triggerEvents = ["click", "scroll", "keydown", "mousemove", "touchstart"],
  fallbackTimeout = 3000,
  onLoad,
  onError,
}: LazyScriptProps) {
  const [loaded, setLoaded] = useState(false);
  const [loadTriggered, setLoadTriggered] = useState(false);

  useEffect(() => {
    if (loaded || loadTriggered) return;

    const loadScript = () => {
      if (loadTriggered) return;
      setLoadTriggered(true);

      // Remover listeners
      triggerEvents.forEach((event) => {
        window.removeEventListener(event as keyof WindowEventMap, loadScript, listenerOptions);
      });
      clearTimeout(timeoutId);

      // Crear e inyectar script
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      if (id) script.id = id;
      
      // Atributos adicionales
      Object.entries(attrs).forEach(([key, value]) => {
        script.setAttribute(key, value);
      });

      script.onload = () => {
        setLoaded(true);
        onLoad?.();
      };
      script.onerror = (error) => {
        onError?.(error);
      };

      document.head.appendChild(script);
    };

    // Listeners de interacción (passive para no bloquear scroll)
    const listenerOptions: AddEventListenerOptions = { once: true, passive: true };
    triggerEvents.forEach((event) => {
      window.addEventListener(event as keyof WindowEventMap, loadScript, listenerOptions);
    });

    // Fallback timeout
    const timeoutId = setTimeout(loadScript, fallbackTimeout);

    return () => {
      triggerEvents.forEach((event) => {
        window.removeEventListener(event as keyof WindowEventMap, loadScript, listenerOptions);
      });
      clearTimeout(timeoutId);
    };
  }, [src, id, attrs, triggerEvents, fallbackTimeout, onLoad, onError, loaded, loadTriggered]);

  // No renderiza nada visible
  return null;
}