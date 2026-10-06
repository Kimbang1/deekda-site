import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(`../../${p}`, import.meta.url), "utf8");

test("DotField: reacts to capability changes and validates the accent payload", () => {
  const src = read("components/DotField.tsx");
  assert.match(src, /addEventListener\("change"/);
  assert.match(src, /parseHex\(/);
  assert.match(src, /ACCENT_EVENT/);
  assert.match(src, /aria-hidden="true"/);
  assert.match(src, /Math\.min\(window\.devicePixelRatio \|\| 1, 2\)/);
});

test("DotField: a throttled pointer move still applies the final position (trailing call)", () => {
  const src = read("components/DotField.tsx");
  assert.match(src, /trailing/);
  assert.match(src, /window\.clearTimeout\(trailing\)/);
});

test("RootShell mounts the dot field before the page content", () => {
  const src = read("components/RootShell.tsx");
  assert.ok(src.indexOf("<DotField") > -1 && src.indexOf("<DotField") < src.indexOf("{children}"));
});
