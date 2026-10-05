import { PrivacyPage } from "@/components/pages/Privacy";
import { metaFor } from "@/lib/meta";

export const metadata = metaFor("ko", "privacy");

export default function Page() {
  return <PrivacyPage lang="ko" />;
}
