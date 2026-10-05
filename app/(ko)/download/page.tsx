import { DownloadPage } from "@/components/pages/Download";
import { metaFor } from "@/lib/meta";

export const metadata = metaFor("ko", "download");

export default function Page() {
  return <DownloadPage lang="ko" />;
}
