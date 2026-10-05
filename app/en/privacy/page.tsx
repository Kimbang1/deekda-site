import { PrivacyPage } from "@/components/pages/Privacy";
import { metaFor } from "@/lib/meta";

export const metadata = metaFor("en", "privacy");

export default function Page() {
  return <PrivacyPage lang="en" />;
}
