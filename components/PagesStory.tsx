"use client";

import { useEffect, useRef, useState } from "react";
import { pickActive } from "@/lib/story";
import { Watch, type WatchKind } from "./Watch";

type Item = { key: WatchKind; title: string; body: string };

// Left text scrolls; the right watch is position: sticky and only its screen changes (crossfade + 2px blur, ~200ms).
// Below 900px there is no sticky: each step shows its own watch.
export function PagesStory({ items, online, labels }: { items: Item[]; online: string; labels: Record<WatchKind, string> }) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const steps = stepRefs.current.filter((s): s is HTMLLIElement => s !== null);
    const visible = steps.map(() => false);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible[steps.indexOf(entry.target as HTMLLIElement)] = entry.isIntersecting;
        setActive((previous) => pickActive(visible, previous));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    steps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div className="story" data-active={active}>
      <ol className="story-steps">
        {items.map((it, i) => (
          <li key={it.key} className="story-step" data-index={i} ref={(el) => { stepRefs.current[i] = el; }}>
            <span className="cap mono dim">{`0${i + 1}`}</span>
            <h3 className="h1">{it.title}</h3>
            <p className="lead muted">{it.body}</p>
            <div className="story-inline"><Watch kind={it.key} theme="neon" online={online} label={labels[it.key]} /></div>
          </li>
        ))}
      </ol>
      <div className="story-stage" aria-hidden="true">
        {items.map((it, i) => (
          <div key={it.key} className="story-screen" data-screen={i}>
            <Watch kind={it.key} theme="neon" online={online} />
          </div>
        ))}
      </div>
    </div>
  );
}
