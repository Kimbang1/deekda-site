// Pure math for the site's dot-field background (spec 3). No DOM access here so it runs under node --test.

export type Rgb = [number, number, number];
export type Dot = { cx: number; cy: number };
export type Pointer = { x: number; y: number };
export type Reaction = { strength: number; dx: number; dy: number };
export type MotionEnv = { hover: boolean; finePointer: boolean; reducedMotion: boolean };

export const DOT = { spacing: 24, radius: 1.25, reach: 160, push: 6, maxDots: 5000 } as const;
// Spec 3.1: highlight alpha never above 0.35.
export const ALPHA = { idle: 0.25, max: 0.35 } as const;
export const IDLE_HEX = "#66728C";
// Same "live" colors as the watch themes in components/Watch.tsx (a test keeps them in sync).
export const ACCENT = { modern: "#33D9E8", matrix: "#72DD8B", neon: "#22D3EE" } as const;
export type AccentKey = keyof typeof ACCENT;
export const ACCENT_EVENT = "deekda-accent";

// A very large viewport must not create a giant grid: widen the spacing until the dot count fits.
export function gridSpacingFor(width: number, height: number, base: number = DOT.spacing, maxDots: number = DOT.maxDots): number {
  const dots = (width / base) * (height / base);
  return dots <= maxDots ? base : Math.ceil(base * Math.sqrt(dots / maxDots));
}

export function buildGrid(width: number, height: number, spacing: number = gridSpacingFor(width, height)): Dot[] {
  const dots: Dot[] = [];
  for (let y = spacing / 2; y < height; y += spacing) {
    for (let x = spacing / 2; x < width; x += spacing) dots.push({ cx: x, cy: y });
  }
  return dots;
}

const NONE: Reaction = { strength: 0, dx: 0, dy: 0 };

// 0 outside the reach, 1 under the pointer; the push points away from the pointer.
export function reactionAt(dot: Dot, pointer: Pointer | null, reach: number = DOT.reach, push: number = DOT.push): Reaction {
  if (!pointer) return NONE;
  const vx = dot.cx - pointer.x;
  const vy = dot.cy - pointer.y;
  const dist = Math.hypot(vx, vy);
  if (dist >= reach) return NONE;
  const strength = 1 - dist / reach;
  if (dist === 0) return { strength, dx: 0, dy: 0 };
  return { strength, dx: (vx / dist) * push * strength, dy: (vy / dist) * push * strength };
}

// Idle dots keep a faint hint of the accent: a theme change then shows on touch and with reduced motion too.
export const IDLE_TINT = 0.2;
export function idleColor(accent: Rgb): Rgb {
  return mixRgb(parseHex(IDLE_HEX) as Rgb, accent, IDLE_TINT);
}

export const dotRadius = (strength: number): number => DOT.radius * (1 + strength);
export const dotAlpha = (strength: number): number => ALPHA.idle + (ALPHA.max - ALPHA.idle) * strength;

export function parseHex(hex: string): Rgb | null {
  const match = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!match) return null;
  const n = parseInt(match[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function mixRgb(a: Rgb, b: Rgb, t: number): Rgb {
  const k = Math.min(1, Math.max(0, t));
  return [Math.round(a[0] + (b[0] - a[0]) * k), Math.round(a[1] + (b[1] - a[1]) * k), Math.round(a[2] + (b[2] - a[2]) * k)];
}

export const rgba = (c: Rgb, alpha: number): string => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`;

// Cursor reaction only for a real mouse and only when the user did not ask for reduced motion.
export const reactionEnabled = (env: MotionEnv): boolean => env.hover && env.finePointer && !env.reducedMotion;
