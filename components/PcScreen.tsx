import type { ReactNode } from "react";
import { PC_DATA, PC_SIZE, layoutPanels, type Panel, type PcMode } from "@/lib/pcmetrics";

const C = { surface: "#131A2C", line: "#243049", line2: "#33415F", text: "#E8ECF4", muted: "#9AA6BD", dim: "#66728C", cyan: "#22D3EE", violet: "#A78BFA", orange: "#FB923C" };

type PanelProps = { p: Panel; on: boolean };

function Txt({ on, x, y, children, fill = C.muted, anchor = "start" }: { on: boolean; x: number; y: number; children: string; fill?: string; anchor?: "start" | "end" }) {
  if (!on) return null;
  return <text x={x} y={y + 9} className="wmono" fontSize={9} fill={fill} textAnchor={anchor}>{children}</text>;
}

function Head({ p, on, label, value }: PanelProps & { label: string; value: string }) {
  if (!on) return <rect x={p.x + 8} y={p.y + 8} width={p.w * 0.25} height={4} rx={2} fill={C.line2} />;
  return (
    <>
      <Txt on x={p.x + 8} y={p.y + 6} fill={C.dim}>{label}</Txt>
      <Txt on x={p.x + p.w - 8} y={p.y + 6} fill={C.text} anchor="end">{value}</Txt>
    </>
  );
}

function Bar({ x, y, w, h, fraction, color }: { x: number; y: number; w: number; h: number; fraction: number; color: string }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={C.line} />
      <rect x={x} y={y} width={Math.max(h, w * fraction)} height={h} rx={h / 2} fill={color} />
    </>
  );
}

function Spark({ p, data, color, top, bottom }: { p: Panel; data: readonly number[]; color: string; top: number; bottom: number }) {
  const w = p.w - 16;
  const h = bottom - top;
  const points = data.map((v, i) => `${(p.x + 8 + (w * i) / (data.length - 1)).toFixed(1)},${(top + h - h * v).toFixed(1)}`).join(" ");
  return <polyline points={points} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />;
}

function Cpu({ p, on }: PanelProps) {
  const n = p.w < 110 ? 8 : 12;
  const gap = 2;
  const by = p.y + 22;
  const bh = p.h - 22 - (on ? 18 : 8);
  const barW = (p.w - 16 - gap * (n - 1)) / n;
  return (
    <>
      <Head p={p} on={on} label="CPU" value="42%" />
      {PC_DATA.cpu.slice(0, n).map((v, i) => <rect key={i} x={p.x + 8 + i * (barW + gap)} y={by + bh - bh * v} width={barW} height={bh * v} rx={1} fill={v > 0.8 ? C.orange : C.cyan} />)}
      <Txt on={on} x={p.x + 8} y={p.y + p.h - 16}>4.8GHz 68°C 95W</Txt>
    </>
  );
}

function Gpu({ p, on }: PanelProps) {
  const rowH = (p.h - 24) / 3;
  const rows = [["Usage 61%", 0.61, C.cyan], ["VRAM 8.2/12G", 0.68, C.violet], ["Temp 72°C", 0.72, C.orange]] as const;
  return (
    <>
      <Head p={p} on={on} label="GPU" value="61%" />
      {rows.map((r, i) => {
        const ry = p.y + 22 + i * rowH;
        return (
          <g key={r[0]}>
            <Txt on={on} x={p.x + 8} y={ry}>{r[0]}</Txt>
            <Bar x={p.x + 8} y={ry + (on ? 14 : 4)} w={p.w - 16} h={4} fraction={r[1]} color={r[2]} />
          </g>
        );
      })}
    </>
  );
}

function Ram({ p, on }: PanelProps) {
  return (
    <>
      <Head p={p} on={on} label="RAM" value="18.4/32G" />
      <Bar x={p.x + 8} y={p.y + 26} w={p.w - 16} h={10} fraction={0.57} color={C.violet} />
      {["commit 24.1G", "cache  6.2G", "swap   0.4G"].map((line, i) => <Txt key={line} on={on} x={p.x + 8} y={p.y + 44 + i * 14}>{line}</Txt>)}
    </>
  );
}

function Net({ p, on }: PanelProps) {
  const bottom = p.y + p.h - (on ? 22 : 8);
  return (
    <>
      <Head p={p} on={on} label="NET" value="84 Mbps" />
      <Spark p={p} data={PC_DATA.down} color={C.cyan} top={p.y + 24} bottom={bottom} />
      <Spark p={p} data={PC_DATA.up} color={C.violet} top={p.y + 24} bottom={bottom} />
      <Txt on={on} x={p.x + 8} y={p.y + p.h - 16}>DL 84  UL 12</Txt>
    </>
  );
}

function Fans({ p, on }: PanelProps) {
  const rows = [["CPU 1240rpm", 0.52], ["CASE 860rpm", 0.36], ["GPU 1410rpm", 0.6], ["MB 38°C SSD 44°C", 0.4]] as const;
  return (
    <>
      <Head p={p} on={on} label="FAN/TEMP" value="5 sensors" />
      {rows.map((r, i) => {
        const ry = p.y + 22 + i * ((p.h - 26) / 4);
        return (
          <g key={r[0]}>
            <Txt on={on} x={p.x + 8} y={ry}>{r[0]}</Txt>
            {on ? null : <Bar x={p.x + 8} y={ry + 2} w={p.w - 16} h={4} fraction={r[1]} color={C.cyan} />}
          </g>
        );
      })}
    </>
  );
}

function Disk({ p, on }: PanelProps) {
  return (
    <>
      <Head p={p} on={on} label="DISK" value="R312 W96" />
      <Spark p={p} data={PC_DATA.disk} color={C.orange} top={p.y + 24} bottom={p.y + p.h - (on ? 22 : 8)} />
      <Txt on={on} x={p.x + 8} y={p.y + p.h - 16}>MB/s  nvme0 44°C</Txt>
    </>
  );
}

function Procs({ p, on }: PanelProps) {
  const rowH = (p.h - 24) / PC_DATA.procs.length;
  return (
    <>
      <Head p={p} on={on} label="PROCESS" value="CPU %" />
      {PC_DATA.procs.map((r, i) => {
        const ry = p.y + 22 + i * rowH;
        return (
          <g key={r[0]}>
            <Txt on={on} x={p.x + 8} y={ry} fill={C.text}>{r[0]}</Txt>
            <Bar x={p.x + (on ? 112 : 8)} y={ry + (on ? 4 : 2)} w={on ? p.w - 168 : p.w - 16} h={4} fraction={Math.min(1, r[1] / 32)} color={C.cyan} />
            <Txt on={on} x={p.x + p.w - 8} y={ry} anchor="end">{r[1].toFixed(1)}</Txt>
          </g>
        );
      })}
    </>
  );
}

// Phone-width card: four panels, one bar or one line each.
function Compact({ p }: { p: Panel }) {
  const rows: Record<string, { value: string; fraction: number | null; color: string; line: string }> = {
    CPU: { value: "42%", fraction: 0.42, color: C.cyan, line: "4.8GHz 68°C" },
    GPU: { value: "61%", fraction: 0.61, color: C.violet, line: "VRAM 8.2G 72°C" },
    RAM: { value: "18/32G", fraction: 0.57, color: C.violet, line: "cache 6.2G" },
    Network: { value: "84 Mbps", fraction: null, color: C.cyan, line: "" },
  };
  const m = rows[p.name];
  return (
    <>
      <Head p={p} on label={p.name} value={m.value} />
      {m.fraction === null ? <Spark p={p} data={PC_DATA.down} color={m.color} top={p.y + 22} bottom={p.y + p.h - 6} /> : (
        <>
          <Bar x={p.x + 8} y={p.y + 24} w={p.w - 16} h={6} fraction={m.fraction} color={m.color} />
          <Txt on x={p.x + 8} y={p.y + 36}>{m.line}</Txt>
        </>
      )}
    </>
  );
}

const BODY: Record<string, (props: PanelProps) => ReactNode> = {
  CPU: Cpu, GPU: Gpu, RAM: Ram, Network: Net, "Fans & temps": Fans, Disk: Disk, Processes: Procs,
};

// mode: "full" readable labels, "compact" phone card, "bars" shapes only (too small to read, used in the hero).
export function PcScreen({ mode, className }: { mode: PcMode; className?: string }) {
  const { w, h } = PC_SIZE[mode];
  const on = mode !== "bars";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} data-pc={mode} aria-hidden="true">
      <rect x={0.5} y={0.5} width={w - 1} height={h - 1} rx={8} fill="#070A12" stroke={C.line2} />
      {mode === "compact" ? null : (
        <>
          {[C.orange, C.violet, C.cyan].map((c, i) => <circle key={c} cx={13 + i * 10} cy={12} r={3} fill={c} />)}
          <Txt on={on} x={44} y={5} fill={C.dim}>System Monitor</Txt>
        </>
      )}
      {layoutPanels(mode).map((p) => {
        const Body = BODY[p.name];
        return (
          <g key={p.name} data-panel={p.name}>
            <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={4} fill={C.surface} />
            {mode === "compact" ? <Compact p={p} /> : <Body p={p} on={on} />}
          </g>
        );
      })}
    </svg>
  );
}
