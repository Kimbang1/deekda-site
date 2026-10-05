// The App Store listings link to /support.html and /privacy.html. The new site serves /support/ and /privacy/,
// so after the export we copy those pages to the old file names to keep the published URLs working.
import { copyFileSync, existsSync } from "node:fs";

const pairs = [
  ["out/support/index.html", "out/support.html"],
  ["out/privacy/index.html", "out/privacy.html"],
];

for (const [from, to] of pairs) {
  if (!existsSync(from)) {
    console.error(`legacy-urls: ${from} not found, did the export run?`);
    process.exit(1);
  }
  copyFileSync(from, to);
  console.log(`legacy-urls: ${to}`);
}
