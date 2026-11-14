"use client";

import { useEffect, useState, useRef, RefObject } from "react";

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.15, ...options });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [ref, isInView];
}

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setProgress(0);
        return;
      }
      const currentScroll = window.scrollY;
      const pct = Math.min(1, Math.max(0, currentScroll / totalHeight));
      setProgress(pct);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

export function usePrefersReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return reducedMotion;
}
