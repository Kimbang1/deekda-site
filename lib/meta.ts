import type { Metadata } from "next";
import { pagePath, type Lang, type PageKey } from "./site";

const TITLES: Record<Lang, Record<PageKey, string>> = {
  ko: {
    home: "Deekda · 책상 위에 켜 두는 작은 PC 상태등",
    download: "다운로드 · Deekda",
    support: "지원 · Deekda",
    privacy: "개인정보처리방침 · Deekda",
  },
  en: {
    home: "Deekda · A tiny PC status light for your desk",
    download: "Download · Deekda",
    support: "Support · Deekda",
    privacy: "Privacy Policy · Deekda",
  },
};

const DESCRIPTIONS: Record<Lang, string> = {
  ko: "안 쓰는 Apple Watch·Galaxy Watch에 PC의 CPU·온도·날씨와 표정이 바뀌는 캐릭터를 띄우는 데스크테리어 디스플레이. 서버·계정 없이 Bluetooth로 직접 연결합니다.",
  en: "A desk display that shows your PC's CPU, temperatures, weather and a mascot with a changing face on a spare Apple Watch or Galaxy Watch. Connects over Bluetooth with no server or account.",
};

export function metaFor(lang: Lang, page: PageKey): Metadata {
  return {
    title: TITLES[lang][page],
    description: DESCRIPTIONS[lang],
    alternates: {
      canonical: pagePath(lang, page),
      languages: { ko: pagePath("ko", page), en: pagePath("en", page) },
    },
  };
}
