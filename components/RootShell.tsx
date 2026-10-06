import type { ReactNode } from "react";
import { JetBrains_Mono } from "next/font/google";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@/app/globals.css";
import { DotField } from "@/components/DotField";
import { RevealObserver } from "@/components/RevealObserver";
import type { Lang } from "@/lib/site";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

// Runs before paint: turns on the `js` class (which hides `.reveal` items until they scroll in) and arms a fail-safe that
// turns it off again after 6s. RevealObserver cancels the fail-safe once the JS bundle is running, so a bundle that never
// loads cannot leave content invisible.
const REVEAL_BOOT = 'document.documentElement.classList.add("js");window.__revealFallback=setTimeout(function(){document.documentElement.classList.remove("js")},6000)';

export function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} className={mono.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOT }} />
      </head>
      <body>
        <DotField />
        <RevealObserver />
        {children}
      </body>
    </html>
  );
}
