import type { ReactNode } from "react";

export function Badge({ tone, children }: { tone: "cyan" | "violet"; children: ReactNode }) {
  return (
    <span className={`badge badge-${tone}`}>
      <i aria-hidden="true" />
      {children}
    </span>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return <span className="chip">{children}</span>;
}

export function ButtonLink({ href, kind = "primary", children }: { href: string; kind?: "primary" | "secondary"; children: ReactNode }) {
  return <a href={href} className={`btn btn-${kind}`}>{children}</a>;
}

export function DisabledButton({ children }: { children: ReactNode }) {
  return <span className="btn btn-disabled" aria-disabled="true">{children}</span>;
}

export function Section({ tone = "base", className = "", children, id }: { tone?: "base" | "alt"; className?: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className={`section section-${tone} ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

// A plain desktop: the PC screen keeps showing whatever you are working on (Deekda never replaces it).
export function MonitorDesktop() {
  const bar = (x: number, y: number, w: number, c: string) => <rect x={x} y={y} width={w} height={5} rx={2.5} fill={c} />;
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="240" fill="#0A0F1C" />
      <rect x="20" y="20" width="236" height="170" rx="8" fill="#131A2C" stroke="#243049" />
      <rect x="20" y="20" width="236" height="22" rx="8" fill="#1A2338" />
      {[0, 1, 2].map((i) => <circle key={i} cx={34 + i * 14} cy={31} r={3.5} fill="#33415F" />)}
      {bar(36, 62, 70, "#A78BFA")}{bar(36, 78, 150, "#33415F")}{bar(52, 94, 110, "#33415F")}
      {bar(52, 110, 170, "#33415F")}{bar(36, 126, 60, "#22D3EE")}{bar(52, 142, 130, "#33415F")}{bar(36, 158, 90, "#33415F")}
      <rect x="272" y="44" width="108" height="100" rx="8" fill="#131A2C" stroke="#243049" />
      <rect x="272" y="44" width="108" height="20" rx="8" fill="#1A2338" />
      {bar(284, 80, 60, "#33415F")}{bar(284, 96, 84, "#33415F")}{bar(284, 112, 48, "#FB923C")}
      <rect x="0" y="216" width="400" height="24" fill="#10172A" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={16 + i * 28} y={222} width={16} height={12} rx={3} fill="#243049" />)}
    </svg>
  );
}
