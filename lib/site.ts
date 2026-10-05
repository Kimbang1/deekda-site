export type Lang = "ko" | "en";
export type PageKey = "home" | "download" | "support" | "privacy";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const RELEASES = {
  windows: {
    tag: "windows-v0.1.8",
    url: "https://github.com/Kimbang1/deekda-site/releases/download/windows-v0.1.8/Deekda-Setup-0.1.8.exe",
  },
  mac: {
    tag: "mac-v0.1.0",
    url: "https://github.com/Kimbang1/deekda-site/releases/download/mac-v0.1.0/Deekda-macos-0.1.0.dmg",
  },
} as const;

// Fill in once the App Store listing exists. Empty = the button shows as "coming soon" instead of linking nowhere.
export const APP_STORE_URL = "";

export const CONTACT_EMAIL = "arto135@naver.com";

const PATHS: Record<PageKey, string> = { home: "/", download: "/download/", support: "/support/", privacy: "/privacy/" };

// Path inside the app (next/link adds the basePath itself).
export function pagePath(lang: Lang, page: PageKey): string {
  return lang === "ko" ? PATHS[page] : `/en${PATHS[page]}`;
}

// Path for plain <img> / <a> tags, which do not get the basePath automatically.
export function asset(path: string): string {
  return `${BASE}${path}`;
}
