import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { ACCENT } from "../../lib/dotfield.ts";

const watch = readFileSync(new URL("../../components/Watch.tsx", import.meta.url), "utf8");

for (const theme of ["modern", "matrix", "neon"]) {
  test(`ACCENT.${theme} matches the ${theme} watch theme's live color`, () => {
    const line = watch.split("\n").find((l) => l.trim().startsWith(`${theme}:`) && l.includes("live:"));
    assert.ok(line, `no ${theme} palette line in Watch.tsx`);
    const live = /live: "(#[0-9A-Fa-f]{6})"/.exec(line)[1];
    assert.equal(ACCENT[theme].toLowerCase(), live.toLowerCase());
  });
}
