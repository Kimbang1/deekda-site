import type { CSSProperties } from "react";

// The app's real System and Character pages, redrawn as SVG on the Apple Watch point grid (198 x 242).
// Coordinates come from the measured watchOS app (and CharacterGeometry.swift for the Guardian Robot face).

export type WatchTheme = "modern" | "matrix" | "neon";
export type WatchKind = "system" | "character";

type Palette = { bg: string; track: string; a: string; b: string; c: string; text: string; muted: string; live: string; eye: string; mono: boolean };

const THEMES: Record<WatchTheme, Palette> = {
  modern: { bg: "#0B0F14", track: "#26323A", a: "#4FC3F7", b: "#AB6BFF", c: "#FFB74D", text: "#F3FAFC", muted: "#8AA1AB", live: "#33D9E8", eye: "#E8F2F5", mono: false },
  matrix: { bg: "#080A08", track: "#203526", a: "#72DD8B", b: "#F2C879", c: "#C5E7BD", text: "#C5E7BD", muted: "#719078", live: "#72DD8B", eye: "#72DD8B", mono: true },
  neon: { bg: "#05070D", track: "#1C2540", a: "#22D3EE", b: "#A78BFA", c: "#FB923C", text: "#E8ECF4", muted: "#9AA6BD", live: "#22D3EE", eye: "#22D3EE", mono: false },
};

const glow = (color: string, radius: number): CSSProperties => ({ filter: `drop-shadow(0 0 ${radius}px ${color}99)` });
const rad = (deg: number) => (deg * Math.PI) / 180;

// 270 degree ring, open at the bottom, band 9% of the diameter, round ends (like the app's gauges).
function Ring({ cx, cy, d, fraction, color, track }: { cx: number; cy: number; d: number; fraction: number; color: string; track: string }) {
  const band = d * 0.09;
  const r = d / 2 - band / 2;
  const point = (deg: number) => `${(cx + r * Math.cos(rad(deg))).toFixed(2)} ${(cy + r * Math.sin(rad(deg))).toFixed(2)}`;
  const arc = (sweep: number) => `M ${point(135)} A ${r} ${r} 0 ${sweep > 180 ? 1 : 0} 1 ${point(135 + sweep)}`;
  return (
    <>
      <path d={arc(270)} fill="none" stroke={track} strokeWidth={band} strokeLinecap="round" />
      <path d={arc(270 * fraction)} fill="none" stroke={color} strokeWidth={band} strokeLinecap="round" style={glow(color, 2.4)} />
    </>
  );
}

function Gauge({ p, cx, cy, size, label, value, fraction, color }: { p: Palette; cx: number; cy: number; size: number; label: string; value: string; fraction: number; color: string }) {
  const num = p.mono ? "wmono" : "wsans";
  return (
    <>
      <Ring cx={cx} cy={cy} d={size} fraction={fraction} color={color} track={p.track} />
      <text x={cx} y={cy} className={num} fontSize={13} fontWeight={600} fill={p.text} textAnchor="middle" dominantBaseline="central">{value}</text>
      <text x={cx} y={cy + size / 2 + 8} className={num} fontSize={10} fill={p.muted} textAnchor="middle" dominantBaseline="central">{label}</text>
    </>
  );
}

const SPARK = [28, 34, 30, 38, 41, 35, 31, 37, 40, 34, 29, 35, 39, 36];

function SystemScreen({ p, online }: { p: Palette; online: string }) {
  const size = (184 - 2 * 3) / 3;
  const sx = 7, sy = 150, sw = 184, sh = 36;
  const pts = SPARK.map((v, i) => [sx + (i / (SPARK.length - 1)) * sw, sy + sh * (1 - v / 100)]);
  const line = pts.map((q, i) => `${i === 0 ? "M" : "L"} ${q[0].toFixed(2)} ${q[1].toFixed(2)}`).join(" ");
  const area = `${line} L ${sx + sw} ${sy + sh} L ${sx} ${sy + sh} Z`;
  return (
    <>
      <text x={173} y={33.5} className="wsans" fontSize={18} fontWeight={600} fill={p.text} textAnchor="end" dominantBaseline="central">8:04</text>
      {[56.5, 65, 73.5].map((y, i) => <circle key={y} cx={191.5} cy={y} r={2.75} fill={i === 0 ? p.text : p.muted} />)}
      <circle cx={27.5} cy={61.5} r={3} fill={p.live} />
      <text x={33} y={61.5} className="wsans" fontSize={15} fill={p.muted} dominantBaseline="central"><tspan fill={p.live}>{online}</tspan> · MacBook Pro</text>
      {([["CPU", "34%", 0.34, p.a], ["RAM", "52%", 0.52, p.b], ["GPU", "21%", 0.21, p.c]] as const).map((g, i) => (
        <Gauge key={g[0]} p={p} cx={7 + size / 2 + i * (size + 3)} cy={104} size={size} label={g[0]} value={g[1]} fraction={g[2]} color={g[3]} />
      ))}
      <path d={area} fill={p.a} fillOpacity={0.12} />
      <path d={line} fill="none" stroke={p.a} strokeWidth={2} strokeLinejoin="round" />
      <text x={7} y={204} className="wmono" fontSize={10} fill={p.muted} dominantBaseline="central">C 46°C</text>
      <text x={66.5} y={204} className="wmono" fontSize={10} fill={p.muted} dominantBaseline="central">G 41°C</text>
      <text x={191} y={204} className="wmono" fontSize={10} fill={p.muted} textAnchor="end" dominantBaseline="central">F 1820 RPM</text>
    </>
  );
}

// Guardian Robot, faceShapes(.ordinary): two ovals (rx 9, ry 12.5) at x 68 / 112 (y 74) and a smile (74,99) - (90,111) - (106,99), stroke 6.
const UNIT = 0.85;

export function GuardianFace({ p, cx, cy }: { p: Palette; cx: number; cy: number }) {
  const px = (x: number) => cx + (x - 90) * UNIT;
  const py = (y: number) => cy + (y - 83) * UNIT;
  return (
    <g style={glow(p.eye, 3)}>
      {[68, 112].map((x) => <ellipse key={x} cx={px(x)} cy={py(74)} rx={9 * UNIT} ry={12.5 * UNIT} fill={p.eye} />)}
      <path d={`M ${px(74)} ${py(99)} Q ${px(90)} ${py(111)} ${px(106)} ${py(99)}`} fill="none" stroke={p.eye} strokeWidth={6 * UNIT} strokeLinecap="round" />
    </g>
  );
}

function CharacterScreen({ p }: { p: Palette }) {
  return (
    <>
      <text x={173} y={33.5} className="wsans" fontSize={18} fontWeight={600} fill={p.text} textAnchor="end" dominantBaseline="central">8:04</text>
      {[56.5, 65, 73.5].map((y, i) => <circle key={y} cx={191.5} cy={y} r={2.75} fill={i === 2 ? p.text : p.muted} />)}
      <GuardianFace p={p} cx={99} cy={102} />
      <text x={99} y={180} className="wsans" fontSize={11} fill={p.muted} textAnchor="middle" dominantBaseline="central">Calm</text>
    </>
  );
}

export function Watch({ kind, theme = "neon", online = "Online", label, className }: { kind: WatchKind; theme?: WatchTheme; online?: string; label?: string; className?: string }) {
  const p = THEMES[theme];
  return (
    <svg viewBox="0 0 100 120" className={className} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <rect x={96} y={36} width={4} height={16} rx={2} fill="#2A3550" />
      <rect x={0.5} y={0.5} width={99} height={119} rx={28} fill="#05070D" stroke="#2A3550" />
      <rect x={6} y={6} width={88} height={108} rx={22} fill={p.bg} />
      <svg x={6} y={6} width={88} height={108} viewBox="0 0 198 242">
        {kind === "system" ? <SystemScreen p={p} online={online} /> : <CharacterScreen p={p} />}
      </svg>
    </svg>
  );
}

// Standalone mascot tiles for the themes section.
export function GuardianTile({ label }: { label?: string }) {
  const p = THEMES.neon;
  return (
    <svg viewBox="0 0 198 198" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <rect x={1} y={1} width={196} height={196} rx={32} fill="#000" stroke="#243049" strokeWidth={2} />
      <GuardianFace p={p} cx={99} cy={99} />
    </svg>
  );
}
