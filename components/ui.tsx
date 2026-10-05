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

// Dense "everything at once" PC dashboard used on the home page (the opposite of the watch's few numbers).
export function MonitorTiles({ cols = 4 }: { cols?: number }) {
  const colors = ["#22D3EE", "#A78BFA", "#FB923C"];
  const width = 16 + cols * 96;
  const tiles = Array.from({ length: cols * 3 }, (_, i) => ({ r: Math.floor(i / cols), k: i % cols }));
  return (
    <svg viewBox={`0 0 ${width} 240`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width={width} height="240" fill="#070A12" />
      {tiles.map(({ r, k }) => {
        const x = 16 + k * 96, y = 16 + r * 72;
        return (
          <g key={`${r}-${k}`}>
            <rect x={x} y={y} width={88} height={64} rx={4} fill="#131A2C" />
            <rect x={x + 8} y={y + 8} width={26} height={4} rx={2} fill="#33415F" />
            <rect x={x + 8} y={y + 52} width={(88 - 16) * (0.3 + ((r * 4 + k * 7) % 6) / 9)} height={4} rx={2} fill={colors[(r + k) % 3]} opacity={0.8} />
          </g>
        );
      })}
    </svg>
  );
}
