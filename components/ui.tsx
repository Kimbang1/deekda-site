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
