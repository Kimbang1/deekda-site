const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));

// Hero parallax: the pointer's position in the viewport becomes a small rotation (degrees), at most `max`.
// `0 - ny * max` instead of `-ny * max` keeps the flat case at 0 rather than -0.
export function tiltAngles(x: number, y: number, width: number, height: number, max: number = 5): { rx: number; ry: number } {
  const nx = clamp((x / width) * 2 - 1, -1, 1);
  const ny = clamp((y / height) * 2 - 1, -1, 1);
  return { rx: 0 - ny * max, ry: nx * max };
}
