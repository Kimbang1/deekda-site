"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window { __revealFallback?: number }
}

// Fades `.reveal` elements in once as they scroll into view. Hidden only when <html> has the inline `js` class
// (see RootShell), and a fail-safe reveals everything if the observer never fires, so content is never stuck invisible.
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // The bundle is running, so the inline fail-safe (RootShell) is no longer needed.
    window.clearTimeout(window.__revealFallback);
    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (items.length === 0) return;
    const show = (el: Element) => el.classList.add("in");
    if (!("IntersectionObserver" in window)) {
      items.forEach(show);
      return;
    }
    let fired = false;
    const io = new IntersectionObserver(
      (entries) => {
        fired = true;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    items.forEach((el) => io.observe(el));
    const failSafe = window.setTimeout(() => { if (!fired) items.forEach(show); }, 4000);
    return () => {
      io.disconnect();
      window.clearTimeout(failSafe);
    };
  }, [pathname]);

  return null;
}
