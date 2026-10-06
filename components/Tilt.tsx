"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { reactionEnabled } from "@/lib/dotfield";
import { tiltAngles } from "@/lib/tilt";

// Tilts its children a few degrees toward the pointer (hero parallax). Mouse only, never with reduced motion.
export function Tilt({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const enabled = reactionEnabled({
      hover: matchMedia("(hover: hover)").matches,
      finePointer: matchMedia("(pointer: fine)").matches,
      reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
    if (!enabled) return;
    gsap.set(el, { transformPerspective: 900 });
    const rotateX = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
    const rotateY = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      const a = tiltAngles(e.clientX, e.clientY, window.innerWidth, window.innerHeight);
      rotateX(a.rx);
      rotateY(a.ry);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      gsap.set(el, { clearProps: "transform" });
    };
  }, []);

  return <div ref={ref} className={className} aria-hidden="true">{children}</div>;
}
