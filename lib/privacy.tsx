import type { ReactNode } from "react";
import type { Lang } from "./site";
import { CONTACT_EMAIL } from "./site";

// Text carried over unchanged from the published privacy.html (effective 2026-09-30).
export type PrivacyBlock = { p: ReactNode } | { ul: ReactNode[] };
export type PrivacySection = { id: string; title: string; blocks: PrivacyBlock[] };
export type PrivacyDoc = { heading: string; effective: string; intro: ReactNode; sections: PrivacySection[] };

const OPEN_METEO = "https://open-meteo.com/";
const OPEN_METEO_TERMS = "https://open-meteo.com/en/terms";

const ko: PrivacyDoc = {
  heading: "Deekda 개인정보 처리방침",
  effective: "시행일: 2026년 9월 30일",
  intro: (
    <>
      Deekda(이하 &quot;앱&quot;)는 Apple Watch와 iPhone에서 사용자의 PC 상태를 보여 주는 앱이며, 사용자의 PC에서 실행되는 Deekda Agent(이하 &quot;Agent&quot;)와 함께 동작합니다.
      개발자는 사용자의 개인정보를 수집하거나 저장하지 않습니다.
    </>
  ),
  sections: [
    {
      id: "not-collected",
      title: "1. 수집하지 않는 정보",
      blocks: [
        {
          ul: [
            "계정·이름·이메일 등 가입 정보를 받지 않습니다. 로그인이 없습니다.",
            "광고, 분석(Analytics), 추적 도구를 사용하지 않습니다.",
            "앱과 Agent 모두 개발자의 서버로 어떤 데이터도 보내지 않습니다. 개발자가 운영하는 서버가 없습니다.",
          ],
        },
      ],
    },
    {
      id: "on-device",
      title: "2. 기기 안에서만 처리되는 정보",
      blocks: [
        {
          ul: [
            <><strong>PC 상태 정보</strong>: CPU·GPU·RAM 사용률, 온도, 팬 속도 등은 Agent가 PC에서 읽어 워치나 iPhone으로 Bluetooth를 통해 직접 보냅니다. 이 정보는 기기 화면에 표시될 뿐 다른 곳으로 전송되지 않습니다.</>,
            <><strong>페어링 정보</strong>: 워치나 iPhone과 PC를 연결하는 기기별 인증 키는 그 기기의 키체인과 사용자 PC의 Agent 설정 폴더에만 저장됩니다.</>,
            <><strong>동작(모션) 센서</strong>(Apple Watch): 워치가 거치대에 옆으로 놓였을 때 화면을 돌리기 위해 기울기만 읽으며, 저장하거나 전송하지 않습니다.</>,
            <><strong>Bluetooth</strong>: 사용자의 PC에서 실행 중인 Agent와 연결하는 데만 사용합니다.</>,
          ],
        },
      ],
    },
    {
      id: "weather",
      title: "3. 날씨 정보와 위치",
      blocks: [
        {
          p: (
            <>
              사용자가 PC에서 Agent의 위치 사용을 허용하면, Agent는 PC 운영체제가 알려 주는 현재 위치(위도·경도)를 날씨 정보 제공자인 <a href={OPEN_METEO}>Open-Meteo</a>에 보내 날씨를 받아옵니다.
              이 요청은 워치·iPhone 앱이 아니라 PC의 Agent가 보내며, 개발자는 이 위치를 받거나 저장하지 않습니다. Open-Meteo의 처리 방식은 <a href={OPEN_METEO_TERMS}>Open-Meteo 이용 약관·개인정보 안내</a>를 따릅니다.
              위치 사용을 허용하지 않으면 날씨 화면만 비어 있고 나머지 기능은 그대로 동작합니다.
            </>
          ),
        },
      ],
    },
    {
      id: "deleting",
      title: "4. 정보 삭제",
      blocks: [{ p: <>워치나 iPhone에서 앱을 삭제하거나 설정의 &quot;새 PC 연결&quot;로 페어링을 해제하면 그 기기의 인증 키가 지워집니다. PC 쪽 등록 정보는 Agent 관리 창의 &quot;연결 해제&quot;로 지울 수 있습니다.</> }],
    },
    {
      id: "children",
      title: "5. 아동의 개인정보",
      blocks: [{ p: "앱은 어떤 개인정보도 수집하지 않으므로 아동의 개인정보도 수집하지 않습니다." }],
    },
    {
      id: "contact",
      title: "6. 변경 및 문의",
      blocks: [{ p: <>이 방침이 바뀌면 이 페이지에 새 시행일과 함께 게시합니다. 문의: {CONTACT_EMAIL}</> }],
    },
  ],
};

const en: PrivacyDoc = {
  heading: "Deekda Privacy Policy",
  effective: "Effective: September 30, 2026",
  intro: (
    <>
      Deekda (the &quot;App&quot;) shows your PC&apos;s status on Apple Watch and iPhone and works together with Deekda Agent (the &quot;Agent&quot;), which runs on your own PC. The developer does not collect or store your personal data.
    </>
  ),
  sections: [
    {
      id: "not-collected",
      title: "1. Data we do not collect",
      blocks: [
        {
          ul: [
            "No accounts, names or email addresses. There is no sign-in.",
            "No advertising, analytics or tracking tools.",
            "Neither the App nor the Agent sends any data to the developer. The developer runs no servers.",
          ],
        },
      ],
    },
    {
      id: "on-device",
      title: "2. Data processed only on your devices",
      blocks: [
        {
          ul: [
            <><strong>PC status</strong>: CPU, GPU and RAM usage, temperatures and fan speed are read by the Agent on your PC and sent directly to your watch or iPhone over Bluetooth. They are only displayed on that device and are not sent anywhere else.</>,
            <><strong>Pairing data</strong>: the per-device key that links your watch or iPhone and PC is stored only in that device&apos;s Keychain and in the Agent&apos;s settings folder on your PC.</>,
            <><strong>Motion sensor</strong> (Apple Watch): used only to read tilt so the screen can rotate when the watch sits sideways on a stand. It is not stored or transmitted.</>,
            <><strong>Bluetooth</strong>: used only to connect to the Agent running on your PC.</>,
          ],
        },
      ],
    },
    {
      id: "weather",
      title: "3. Weather and location",
      blocks: [
        {
          p: (
            <>
              If you allow the Agent to use location on your PC, the Agent sends the PC&apos;s current coordinates (latitude and longitude), as reported by the PC&apos;s operating system, to the weather provider <a href={OPEN_METEO}>Open-Meteo</a> to fetch weather.
              This request is made by the Agent on your PC, not by the watch or iPhone app, and the developer never receives or stores this location. Open-Meteo handles it under its <a href={OPEN_METEO_TERMS}>terms and privacy notice</a>.
              If you do not allow location, only the weather screen stays empty; everything else keeps working.
            </>
          ),
        },
      ],
    },
    {
      id: "deleting",
      title: "4. Deleting data",
      blocks: [{ p: <>Deleting the App from your watch or iPhone, or unpairing with &quot;Connect a new PC&quot; in Settings, removes the key from that device. You can remove the PC-side registration with &quot;연결 해제 (Disconnect)&quot; in the Agent window.</> }],
    },
    {
      id: "children",
      title: "5. Children's privacy",
      blocks: [{ p: "The App collects no personal data, including from children." }],
    },
    {
      id: "contact",
      title: "6. Changes and contact",
      blocks: [{ p: <>Any change to this policy will be posted on this page with a new effective date. Contact: {CONTACT_EMAIL}</> }],
    },
  ],
};

export const PRIVACY: Record<Lang, PrivacyDoc> = { ko, en };
