// Layout and sample data for the PC monitoring screen drawn in the "not mirroring" contrast (spec 4).
// Metrics are the ones Deekda reads: CPU, GPU, RAM, temperatures, fans, network, disk, processes. Values are samples.

export type PcMode = "full" | "compact" | "bars";
export type Panel = { name: string; x: number; y: number; w: number; h: number };

export const PC_SIZE: Record<PcMode, { w: number; h: number }> = {
  full: { w: 744, h: 264 },
  compact: { w: 294, h: 136 },
  bars: { w: 400, h: 240 },
};

export const PC_DATA = {
  cpu: [0.42, 0.68, 0.35, 0.81, 0.52, 0.27, 0.74, 0.39, 0.63, 0.48, 0.88, 0.31],
  down: [0.2, 0.25, 0.22, 0.4, 0.55, 0.48, 0.62, 0.8, 0.7, 0.58, 0.66, 0.74, 0.6, 0.52, 0.64, 0.7],
  up: [0.1, 0.12, 0.1, 0.14, 0.2, 0.18, 0.15, 0.22, 0.3, 0.24, 0.2, 0.18, 0.22, 0.26, 0.2, 0.16],
  disk: [0.1, 0.1, 0.35, 0.8, 0.5, 0.2, 0.15, 0.6, 0.9, 0.4, 0.2, 0.12, 0.3, 0.55, 0.25, 0.18],
  procs: [["game.exe", 31.2], ["chrome.exe", 12.4], ["Code.exe", 8.1], ["obs64.exe", 6.7], ["System", 2.3], ["dwm.exe", 1.9]],
} as const;

export function layoutPanels(mode: PcMode): Panel[] {
  const { w, h } = PC_SIZE[mode];
  if (mode === "compact") {
    const gap = 6;
    const pw = (w - 16 - gap) / 2;
    const ph = (h - 16 - gap) / 2;
    return ["CPU", "GPU", "RAM", "Network"].map((name, i) => ({
      name, x: 8 + (i % 2) * (pw + gap), y: 8 + Math.floor(i / 2) * (ph + gap), w: pw, h: ph,
    }));
  }
  const top = 30;
  const gap = 6;
  const pw = (w - 16 - gap * 3) / 4;
  const ph = (h - top - 8 - gap) / 2;
  const cell = (name: string, col: number, row: number, span: number): Panel => ({
    name, x: 8 + col * (pw + gap), y: top + row * (ph + gap), w: pw * span + gap * (span - 1), h: ph,
  });
  return [cell("CPU", 0, 0, 1), cell("GPU", 1, 0, 1), cell("RAM", 2, 0, 1), cell("Network", 3, 0, 1), cell("Fans & temps", 0, 1, 1), cell("Disk", 1, 1, 1), cell("Processes", 2, 1, 2)];
}
