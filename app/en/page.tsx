import { HomePage } from "@/components/pages/Home";
import { metaFor } from "@/lib/meta";

export const metadata = metaFor("en", "home");

export default function Page() {
  return <HomePage lang="en" />;
}
