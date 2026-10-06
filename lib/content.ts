import type { Lang } from "./site";

type Step = { title: string; body: string };
type Pair = { title: string; body: string };
type Faq = { q: string; a: string };

export type Copy = {
  nav: { about: string; support: string; download: string; menu: string };
  footer: { contact: string; privacy: string; weather: string };
  hero: { title: string[]; lead: string; windows: string; mac: string; badgeStore: string; badgeGalaxy: string; caption: string };
  mirror: { title: string; body: string; pc: string; watch: string };
  pages: { title: string; body: string; items: { key: "system" | "weather" | "character"; title: string; body: string }[] };
  themes: { title: string; body: string; guardian: string; pixel: string; names: [string, string, string] };
  steps: { title: string; body: string; items: Step[] };
  trust: { title: string; body: string; items: Pair[] };
  env: { title: string; rows: [string, string][] };
  cta: { title: string; note: string };
  scene: { online: string };
  download: {
    title: string;
    body: string;
    windows: { name: string; note: string; button: string };
    mac: { name: string; note: string; button: string };
    smart: { title: string; body: string; steps: [string, string] };
    store: { title: string; body: string; appStore: string; appStoreSoon: string; play: string };
  };
  support: {
    title: string;
    stepsTitle: string;
    stepsBody: string;
    steps: Step[];
    extras: string[];
    faqTitle: string;
    faq: Faq[];
    contactTitle: string;
    contactBody: string;
  };
  privacy: { title: string; toc: string; tabs: [string, string]; tabLabel: string };
  alt: { system: string; weather: string; character: string; pixel: string };
};

const ko: Copy = {
  nav: { about: "소개", support: "지원", download: "다운로드", menu: "메뉴" },
  footer: { contact: "문의", privacy: "개인정보처리방침", weather: "날씨 데이터 출처 Open-Meteo (CC BY 4.0)" },
  hero: {
    title: ["책상 위에", "켜 두는,", "작은 PC 상태등"],
    lead: "안 쓰는 Apple Watch·Galaxy Watch에 CPU·온도·날씨, 그리고 PC 부하에 따라 표정이 바뀌는 캐릭터를 띄워 보세요. 화면 미러링이 아니라, 작은 화면에 맞게 다시 그린 대시보드예요.",
    windows: "Windows 다운로드",
    mac: "macOS 다운로드",
    badgeStore: "Apple Watch · iPhone App Store 출시",
    badgeGalaxy: "Galaxy 준비 중",
    caption: "책상 위, 모니터 옆 한 자리.",
  },
  mirror: {
    title: "미러링이 아닙니다",
    body: "PC 화면을 그대로 줄여 보여 주지 않아요. CPU·GPU·RAM·온도처럼 지금 필요한 수치만 골라 워치 크기에 맞게 다시 그립니다.",
    pc: "PC — 모든 지표가 한꺼번에",
    watch: "워치 — 상태 수치만 다시 구성",
  },
  pages: {
    title: "System · Weather · Character",
    body: "좌우로 넘기는 세 페이지. 한눈에 보고, 한 번 더 넘기면 분위기가 바뀝니다.",
    items: [
      { key: "system", title: "System", body: "CPU·GPU·RAM, 온도, 팬, 네트워크를 링 게이지로." },
      { key: "weather", title: "Weather", body: "현재 날씨와 시간별 기온. 출처는 Open-Meteo." },
      { key: "character", title: "Character", body: "PC가 바쁘면 표정이 바뀌는 마스코트." },
    ],
  },
  themes: {
    title: "책상 분위기에 맞게",
    body: "테마 3종, 캐릭터 2종. 설정에서 바로 바꿀 수 있어요.",
    guardian: "Guardian Robot",
    pixel: "Pixel Face",
    names: ["Modern", "Matrix", "Nightwatch Neon"],
  },
  steps: {
    title: "세 단계면 끝",
    body: "계정도 서버도 없이, 처음 한 번만 코드를 입력합니다.",
    items: [
      { title: "PC에 Agent 설치", body: "Windows 또는 Apple Silicon Mac에 Deekda Agent를 설치해요." },
      { title: "워치 앱에서 6자리 코드 입력", body: "처음 한 번만 입력하면 Bluetooth로 PC에 직접 연결돼요." },
      { title: "거치대에 올리기", body: "책상 위 거치대에 세워 두면 끝이에요." },
    ],
  },
  trust: {
    title: "안심하고 켜 두세요",
    body: "로컬 전용으로 설계했어요.",
    items: [
      { title: "Bluetooth 직접 연결", body: "워치가 PC의 Agent에 직접 붙어요. 폰이나 중계 서버가 필요 없어요." },
      { title: "서버·계정 없음", body: "가입도 로그인도 없어요. 연결은 처음 한 번, 6자리 코드로." },
      { title: "데이터 수집 없음", body: "모든 처리는 내 기기 안에서만 이루어지고 사용 데이터를 모으지 않아요." },
      { title: "기기별 서명", body: "모든 요청은 기기마다 다른 키로 서명돼요." },
    ],
  },
  env: {
    title: "지원 환경",
    rows: [
      ["PC", "Windows · macOS (Apple Silicon만, Intel Mac 미지원)"],
      ["Apple", "Apple Watch SE (2세대) 이상 · iPhone 앱은 선택"],
      ["Galaxy", "Galaxy Watch4 이상 · Android 폰 앱은 선택"],
    ],
  },
  cta: { title: "책상 위에 올려 볼까요?", note: "Intel Mac은 지원하지 않아요." },
  scene: { online: "온라인" },
  download: {
    title: "다운로드",
    body: "PC에 Agent를 설치하면 워치가 바로 붙을 준비가 끝나요.",
    windows: { name: "Windows", note: "설치 프로그램을 받아 실행하세요. 64비트용이에요. 코드 서명 전이라 SmartScreen 안내가 뜰 수 있어요.", button: "Windows 다운로드" },
    mac: { name: "macOS · Apple Silicon", note: "Apple 공증을 마쳤어요. macOS 13 이상의 Apple Silicon Mac 전용이고, Intel Mac은 지원하지 않아요.", button: "macOS 다운로드" },
    smart: {
      title: "Windows에서 ‘PC 보호’ 화면이 뜨면",
      body: "아직 코드 서명 전이라 SmartScreen이 경고를 보여 줘요. ‘추가 정보’를 누른 뒤 ‘실행’을 선택하면 설치가 시작돼요.",
      steps: ["‘추가 정보’ 클릭", "‘실행’ 선택"],
    },
    store: {
      title: "워치·폰 앱",
      body: "Apple Watch와 iPhone 앱은 App Store에서 받을 수 있어요.",
      appStore: "App Store · Apple Watch · iPhone",
      appStoreSoon: "App Store · 링크 준비 중",
      play: "Google Play · Coming soon",
    },
  },
  support: {
    title: "지원",
    stepsTitle: "시작하기",
    stepsBody: "설치 → 페어링 → 연결 확인, 세 단계예요.",
    steps: [
      { title: "PC에 Agent 설치", body: "macOS(Apple Silicon) 또는 Windows에 Deekda Agent를 설치하고 실행하세요." },
      { title: "6자리 코드 확인", body: "Agent 창에 나온 6자리 코드를 확인하세요. macOS는 메뉴 막대의 Deekda 아이콘에서 볼 수 있어요." },
      { title: "워치에서 코드 입력", body: "Apple Watch 또는 iPhone에서 Deekda를 열고 코드를 입력하면 연결돼요. 이후에는 자동으로 다시 연결됩니다." },
    ],
    extras: [
      "PC 없이 먼저 둘러보려면 Apple Watch는 페어링 키패드 왼쪽 아래의 데모 키를, iPhone은 페어링 화면의 데모 보기를 누르세요.",
      "워치나 쓰지 않는 iPhone을 거치대에 올려 PC 옆에 두면 책상을 꾸미는 작은 상태 디스플레이가 됩니다. iPhone은 가로로 세우면 거치대에 맞는 넓은 화면으로 바뀝니다.",
    ],
    faqTitle: "자주 묻는 질문",
    faq: [
      { q: "연결이 안 돼요", a: "PC와 워치(또는 iPhone)의 Bluetooth가 켜져 있는지, Agent가 실행 중인지 확인하세요. 기기와 PC는 Bluetooth가 닿는 거리(보통 같은 방)에 있어야 합니다." },
      { q: "날씨가 비어 있어요", a: "PC에서 Agent의 위치 사용을 허용해야 합니다. macOS는 시스템 설정 → 개인정보 보호 및 보안 → 위치 서비스에서 허용합니다." },
      { q: "온도나 팬이 안 보여요", a: "macOS는 macmon(Homebrew: brew install macmon)이 필요합니다. 팬이 없는 Mac(MacBook Air 등)은 팬 항목이 표시되지 않습니다." },
      { q: "페어링 코드는 어디서 보나요", a: "PC의 Agent 창에 6자리 코드가 나옵니다. macOS는 메뉴 막대의 Deekda 아이콘에서 볼 수 있어요." },
      { q: "다른 PC로 바꾸고 싶어요", a: "Apple Watch는 캐릭터 화면 → ⚙ → ‘새 PC 연결’, iPhone은 ⚙ → ‘새 PC 연결’을 누른 뒤 새 PC의 코드를 입력하세요." },
      { q: "Intel Mac에서도 되나요", a: "아니요. Deekda Agent는 Apple Silicon Mac(macOS 13 이상)과 Windows를 지원해요." },
      { q: "폰 없이 되나요", a: "네. Apple Watch와 Galaxy Watch는 폰 없이 PC의 Agent에 Bluetooth로 직접 연결돼요." },
    ],
    contactTitle: "찾는 답이 없나요?",
    contactBody: "메일로 알려 주세요. 증상과 PC·워치 기종을 함께 적어 주시면 더 빨리 도와드릴 수 있어요.",
  },
  privacy: { title: "개인정보처리방침", toc: "목차", tabs: ["한국어", "English"], tabLabel: "언어" },
  alt: {
    system: "Apple Watch에 표시된 Deekda System 페이지: CPU·RAM·GPU 링 게이지와 CPU 기록",
    weather: "Apple Watch에 표시된 Deekda Weather 페이지: 습도 게이지와 시간별 기온",
    character: "Apple Watch에 표시된 Deekda Character 페이지: Guardian Robot의 얼굴",
    pixel: "Deekda의 Pixel Face 캐릭터",
  },
};

const en: Copy = {
  nav: { about: "About", support: "Support", download: "Download", menu: "Menu" },
  footer: { contact: "Contact", privacy: "Privacy Policy", weather: "Weather data by Open-Meteo (CC BY 4.0)" },
  hero: {
    title: ["A tiny PC", "status light", "for your desk"],
    lead: "Put an old Apple Watch or Galaxy Watch next to your monitor and let it show your PC's CPU, temperatures and weather, plus a mascot whose face changes with your PC's load. It is not screen mirroring. It is a dashboard redrawn for a tiny screen.",
    windows: "Download for Windows",
    mac: "Download for macOS",
    badgeStore: "Apple Watch · iPhone on the App Store",
    badgeGalaxy: "Galaxy coming soon",
    caption: "One spot on your desk, next to the monitor.",
  },
  mirror: {
    title: "This is not mirroring",
    body: "We do not shrink your PC screen. We pick the status numbers you need right now, such as CPU, GPU, RAM and temperatures, and redraw them for a watch.",
    pc: "PC: every metric at once",
    watch: "Watch: just the status numbers, redrawn",
  },
  pages: {
    title: "System · Weather · Character",
    body: "Three pages you swipe through. Glance at one, swipe once more and the mood changes.",
    items: [
      { key: "system", title: "System", body: "CPU, GPU, RAM, temperatures, fan and network as ring gauges." },
      { key: "weather", title: "Weather", body: "Current weather and hourly temperatures, from Open-Meteo." },
      { key: "character", title: "Character", body: "A mascot whose face changes when your PC gets busy." },
    ],
  },
  themes: {
    title: "Match your desk",
    body: "Three themes and two characters. Switch them right in Settings.",
    guardian: "Guardian Robot",
    pixel: "Pixel Face",
    names: ["Modern", "Matrix", "Nightwatch Neon"],
  },
  steps: {
    title: "Three steps",
    body: "No account, no server. Enter a code once, the first time.",
    items: [
      { title: "Install the Agent on your PC", body: "Install Deekda Agent on Windows or an Apple Silicon Mac." },
      { title: "Enter the 6-digit code on your watch", body: "Enter it once and the watch connects straight to your PC over Bluetooth." },
      { title: "Put it on a stand", body: "Stand it on your desk and you are done." },
    ],
  },
  trust: {
    title: "Leave it on with confidence",
    body: "Designed to stay local.",
    items: [
      { title: "Direct Bluetooth link", body: "Your watch connects straight to the Agent on your PC. No phone or relay server needed." },
      { title: "No server, no account", body: "No sign-up and no login. You connect once with a 6-digit code." },
      { title: "No data collection", body: "Everything is processed on your own devices, and no usage data is collected." },
      { title: "Per-device signing", body: "Every request is signed with a different key for each device." },
    ],
  },
  env: {
    title: "Supported devices",
    rows: [
      ["PC", "Windows · macOS (Apple Silicon only, Intel Macs not supported)"],
      ["Apple", "Apple Watch SE (2nd generation) or later · iPhone app is optional"],
      ["Galaxy", "Galaxy Watch4 or later · Android phone app is optional"],
    ],
  },
  cta: { title: "Ready to put it on your desk?", note: "Intel Macs are not supported." },
  scene: { online: "Online" },
  download: {
    title: "Download",
    body: "Install the Agent on your PC and your watch is ready to connect.",
    windows: { name: "Windows", note: "Download the installer and run it. 64-bit. It is not code-signed yet, so SmartScreen may show a warning.", button: "Download for Windows" },
    mac: { name: "macOS · Apple Silicon", note: "Notarized by Apple. Apple Silicon Macs on macOS 13 or later only. Intel Macs are not supported.", button: "Download for macOS" },
    smart: {
      title: "If Windows shows a protection screen",
      body: "The installer is not code-signed yet, so SmartScreen shows a warning. Choose “More info”, then “Run anyway”, and setup starts.",
      steps: ["Click “More info”", "Choose “Run anyway”"],
    },
    store: {
      title: "Watch and phone apps",
      body: "The Apple Watch and iPhone apps are on the App Store.",
      appStore: "App Store · Apple Watch · iPhone",
      appStoreSoon: "App Store · link coming soon",
      play: "Google Play · Coming soon",
    },
  },
  support: {
    title: "Support",
    stepsTitle: "Getting started",
    stepsBody: "Install, pair, check the connection. Three steps.",
    steps: [
      { title: "Install the Agent on your PC", body: "Install and run Deekda Agent on macOS (Apple Silicon) or Windows." },
      { title: "Find the 6-digit code", body: "The code is shown in the Agent window. On macOS, click the Deekda icon in the menu bar." },
      { title: "Enter the code on your watch", body: "Open Deekda on your Apple Watch or iPhone and enter the code. It reconnects automatically after that." },
    ],
    extras: [
      "Want to look around first without a PC? On Apple Watch, tap Demo at the bottom left of the pairing keypad. On iPhone, tap Try the demo on the pairing screen.",
      "Put your watch or a spare iPhone on a stand next to your PC and it becomes a small status display that dresses up your desk. Turn the iPhone sideways for a wider layout made for stands.",
    ],
    faqTitle: "FAQ",
    faq: [
      { q: "It won't connect", a: "Make sure Bluetooth is on for both your PC and your watch or iPhone, and that the Agent is running. The device must be within Bluetooth range of the PC (usually the same room)." },
      { q: "Weather is empty", a: "Allow the Agent to use location on your PC. On macOS: System Settings → Privacy & Security → Location Services." },
      { q: "Temperatures or fan speed are missing", a: "On macOS the Agent needs macmon (Homebrew: brew install macmon). Fanless Macs such as MacBook Air show no fan reading." },
      { q: "Where do I find the pairing code?", a: "The 6-digit code is shown in the Agent window on your PC. On macOS, click the Deekda icon in the menu bar." },
      { q: "I want to switch to another PC", a: "On Apple Watch, open the Character page → ⚙ → “Connect a new PC”. On iPhone, tap ⚙ → “Connect a new PC”. Then enter the new PC's code." },
      { q: "Does it work on Intel Macs?", a: "No. Deekda Agent supports Apple Silicon Macs (macOS 13 or later) and Windows." },
      { q: "Does it work without a phone?", a: "Yes. Apple Watch and Galaxy Watch connect straight to the Agent on your PC over Bluetooth, no phone needed." },
    ],
    contactTitle: "Did not find your answer?",
    contactBody: "Email us with what happens and which PC and watch you use, and we can help faster.",
  },
  privacy: { title: "Privacy Policy", toc: "Contents", tabs: ["한국어", "English"], tabLabel: "Language" },
  alt: {
    system: "The Deekda System page on an Apple Watch: CPU, RAM and GPU ring gauges and CPU history",
    weather: "The Deekda Weather page on an Apple Watch: humidity gauge and hourly temperatures",
    character: "The Deekda Character page on an Apple Watch: the Guardian Robot face",
    pixel: "The Deekda Pixel Face character",
  },
};

export const COPY: Record<Lang, Copy> = { ko, en };
