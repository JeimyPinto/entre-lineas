import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to use setInterval in a declarative way within React components.
 * Solution inspired by Dan Abramov's blog post.
 * Respects prefers-reduced-motion media query.
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Set up the interval.
  useEffect(() => {
    if (delay !== null && !prefersReducedMotion) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay, prefersReducedMotion]);
}