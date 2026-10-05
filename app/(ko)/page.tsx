import { HomePage } from "@/components/pages/Home";
import { metaFor } from "@/lib/meta";

export const metadata = metaFor("ko", "home");

export default function Page() {
  return <HomePage lang="ko" />;
}
