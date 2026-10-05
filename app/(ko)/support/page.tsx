import { SupportPage } from "@/components/pages/Support";
import { metaFor } from "@/lib/meta";

export const metadata = metaFor("ko", "support");

export default function Page() {
  return <SupportPage lang="ko" />;
}
