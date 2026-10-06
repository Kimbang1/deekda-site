"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  ACCENT, ACCENT_EVENT, ALPHA, DOT, IDLE_HEX, buildGrid, dotAlpha, dotRadius, mixRgb, parseHex, reactionAt, reactionEnabled, rgba,
  type Pointer, type Rgb,
} from "@/lib/dotfield";

// Cursor-reactive dot background (spec 3). Canvas 2D + GSAP tweens; the render loop only runs while something moves.
// Approach follows React Bits' DotGrid (canvas + GSAP on dots near the pointer) but is written for this site's rules
// (idle cost 0, reduced motion, touch fallback, runtime accent) — see the plan's library decision.
type Cell = { cx: number; cy: number; ox: number; oy: number; s: number };

const TAU = Math.PI * 2;
const MOVE_INTERVAL_MS = 50;

export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const idle = parseHex(IDLE_HEX) as Rgb;
    const queries = { hover: matchMedia("(hover: hover)"), fine: matchMedia("(pointer: fine)"), reduced: matchMedia("(prefers-reduced-motion: reduce)") };
    let cells: Cell[] = [];
    let pointer: Pointer | null = null;
    let width = 0;
    let height = 0;
    let lastMove = 0;
    let busy = 0;
    let raf = 0;
    let listening = false;
    let resizeTimer = 0;
    let trailing = 0;
    let accentFrom: Rgb = parseHex(ACCENT.neon) as Rgb;
    let accentTo: Rgb = accentFrom;
    const accent = { t: 1 };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = rgba(idle, ALPHA.idle);
      ctx.beginPath();
      for (const c of cells) {
        if (c.s > 0.001) continue;
        ctx.moveTo(c.cx + DOT.radius, c.cy);
        ctx.arc(c.cx, c.cy, DOT.radius, 0, TAU);
      }
      ctx.fill();
      const accentNow = mixRgb(accentFrom, accentTo, accent.t);
      for (const c of cells) {
        if (c.s <= 0.001) continue;
        ctx.fillStyle = rgba(mixRgb(idle, accentNow, c.s), dotAlpha(c.s));
        ctx.beginPath();
        ctx.arc(c.cx + c.ox, c.cy + c.oy, dotRadius(c.s), 0, TAU);
        ctx.fill();
      }
    };

    const frame = () => {
      raf = 0;
      draw();
      if (busy > 0) raf = requestAnimationFrame(frame);
    };
    const wake = () => { if (!raf) raf = requestAnimationFrame(frame); };
    // Every tween bumps `busy`; when the last one finishes we draw one more frame and the loop stops (idle cost 0).
    const done = () => {
      busy = Math.max(0, busy - 1);
      if (busy === 0) wake();
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gsap.killTweensOf(cells);
      busy = 0;
      cells = buildGrid(width, height).map((d) => ({ cx: d.cx, cy: d.cy, ox: 0, oy: 0, s: 0 }));
      draw();
    };
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    };

    // Retarget every dot that is near the pointer, or still displaced, toward its reaction.
    const relax = () => {
      for (const c of cells) {
        const r = reactionAt(c, pointer);
        if (r.strength === 0 && c.s === 0) continue;
        busy += 1;
        gsap.to(c, { s: r.strength, ox: r.dx, oy: r.dy, duration: r.strength >= c.s ? 0.12 : 0.38, ease: "power3.out", overwrite: true, onComplete: done, onInterrupt: done });
      }
      wake();
    };
    // Throttled to ~20Hz, with a trailing call so the pointer's final position is always applied when it stops.
    const runMove = () => {
      trailing = 0;
      lastMove = performance.now();
      relax();
    };
    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      const wait = MOVE_INTERVAL_MS - (performance.now() - lastMove);
      if (wait <= 0) runMove();
      else if (!trailing) trailing = window.setTimeout(runMove, wait);
    };
    const onLeave = () => {
      window.clearTimeout(trailing);
      trailing = 0;
      pointer = null;
      relax();
    };

    // Theme switcher (ThemeShowcase) announces its accent; tween the highlight color over 200ms.
    const onAccent = (e: Event) => {
      const next = parseHex(String((e as CustomEvent).detail));
      if (!next) return;
      accentFrom = mixRgb(accentFrom, accentTo, accent.t);
      accentTo = next;
      accent.t = 0;
      busy += 1;
      gsap.to(accent, { t: 1, duration: 0.2, ease: "power2.out", overwrite: true, onComplete: done, onInterrupt: done });
      wake();
    };

    // Reactive for a mouse; static (plus slow CSS breathing unless reduced motion) otherwise. Re-evaluated on capability changes.
    const configure = () => {
      const on = reactionEnabled({ hover: queries.hover.matches, finePointer: queries.fine.matches, reducedMotion: queries.reduced.matches });
      canvas.classList.toggle("dotfield--breathe", !on && !queries.reduced.matches);
      if (on === listening) return;
      listening = on;
      if (on) {
        window.addEventListener("pointermove", onMove, { passive: true });
        document.documentElement.addEventListener("pointerleave", onLeave);
      } else {
        window.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
        pointer = null;
        relax();
      }
    };

    resize();
    configure();
    window.addEventListener("resize", onResize);
    window.addEventListener(ACCENT_EVENT, onAccent);
    Object.values(queries).forEach((q) => q.addEventListener("change", configure));

    return () => {
      window.clearTimeout(resizeTimer);
      window.clearTimeout(trailing);
      cancelAnimationFrame(raf);
      gsap.killTweensOf(cells);
      gsap.killTweensOf(accent);
      window.removeEventListener("resize", onResize);
      window.removeEventListener(ACCENT_EVENT, onAccent);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      Object.values(queries).forEach((q) => q.removeEventListener("change", configure));
    };
  }, []);

  return <canvas ref={canvasRef} className="dotfield" aria-hidden="true" />;
}
