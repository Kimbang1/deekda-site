"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { ACCENT, ACCENT_EVENT, type AccentKey } from "@/lib/dotfield";
import { Watch } from "./Watch";

const KEYS: AccentKey[] = ["modern", "matrix", "neon"];

const announce = (key: AccentKey): void => {
  window.dispatchEvent(new CustomEvent(ACCENT_EVENT, { detail: ACCENT[key] }));
};

// Pick a theme: the watches show it and the dot field recolors its highlight (via ACCENT_EVENT).
export function ThemeShowcase({ names, online, groupLabel }: { names: [string, string, string]; online: string; groupLabel: string }) {
  const [theme, setTheme] = useState<AccentKey>("neon");

  // Leaving the page puts the dots back to the default accent.
  useEffect(() => () => announce("neon"), []);

  return (
    <div className="theme-watches" role="radiogroup" aria-label={groupLabel}>
      {KEYS.map((key, i) => (
        <label key={key} className={`theme-choice${theme === key ? " on" : ""}${i === 1 ? " raised" : ""}`} style={{ "--accent": ACCENT[key] } as CSSProperties}>
          <input
            type="radio"
            name="theme"
            value={key}
            checked={theme === key}
            onChange={() => { setTheme(key); announce(key); }}
            className="sr-only"
          />
          <Watch kind="system" theme={key} online={online} label={`${names[i]} theme`} />
          <span className="small muted">{names[i]}</span>
        </label>
      ))}
    </div>
  );
}
