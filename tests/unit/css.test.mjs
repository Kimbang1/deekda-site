import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../../app/globals.css", import.meta.url), "utf8");

// Remove `@media (...) { ... }` blocks (balanced braces) so we can look at the rules outside them.
function withoutBlocks(source, header) {
  let out = "";
  let i = 0;
  while (i < source.length) {
    const at = source.indexOf(header, i);
    if (at === -1) { out += source.slice(i); break; }
    out += source.slice(i, at);
    let depth = 0, j = source.indexOf("{", at);
    do { depth += source[j] === "{" ? 1 : source[j] === "}" ? -1 : 0; j += 1; } while (depth > 0);
    i = j;
  }
  return out;
}

test("motion tokens are defined and ease-in is never used", () => {
  assert.match(css, /--ease-out:\s*cubic-bezier\(0\.23,\s*1,\s*0\.32,\s*1\)/);
  assert.match(css, /--ease-in-out:\s*cubic-bezier\(0\.77,\s*0,\s*0\.175,\s*1\)/);
  assert.doesNotMatch(css, /ease-in[^-]/);
});

test("dot field layer: fixed, behind content, click-through; content sits above it", () => {
  assert.match(css, /\.dotfield\s*\{[^}]*position:\s*fixed[^}]*pointer-events:\s*none/s);
  assert.match(css, /main,\s*\.site-footer\s*\{[^}]*position:\s*relative[^}]*z-index:\s*1/s);
  // the header keeps a higher layer than main so its dropdown menu stays on top
  assert.match(css, /\.site-header\s*\{[^}]*position:\s*relative[^}]*z-index:\s*5/s);
});

test("sections let the dots show through (no solid hero / alt backgrounds)", () => {
  assert.doesNotMatch(css, /\.hero\s*\{[^}]*background:\s*var\(--bg\)/s);
  assert.match(css, /\.section-alt\s*\{[^}]*color-mix\(in srgb, var\(--bg2\) 72%, transparent\)/s);
});

test("hover styles only exist inside the (hover: hover) and (pointer: fine) media query", () => {
  const outside = withoutBlocks(css, "@media (hover: hover) and (pointer: fine)");
  assert.doesNotMatch(outside, /:hover/);
  assert.match(css, /@media \(hover: hover\) and \(pointer: fine\)\s*\{/);
});

test("buttons give press feedback", () => {
  assert.match(css, /\.btn:active\s*\{[^}]*transform:\s*scale\(0\.97\)/s);
});

test("hero: rings cannot cause horizontal scroll (clip, not hidden) and respect reduced motion", () => {
  assert.match(css, /\.hero\s*\{[^}]*overflow-x:\s*clip/s);
  assert.doesNotMatch(css, /\.hero\s*\{[^}]*overflow(-x)?:\s*hidden/s);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)\s*\{[^}]*\.pulse-ring\s*\{[^}]*animation:\s*none/s);
});

test("reveal is only hidden when the inline js class is set, and respects reduced motion", () => {
  assert.match(css, /\.js \.reveal\s*\{[^}]*opacity:\s*0[^}]*translateY\(8px\)/s);
  assert.match(css, /\.js \.reveal\.in\s*\{[^}]*opacity:\s*1/s);
  assert.match(css, /transition-delay:\s*calc\(var\(--i, 0\) \* 50ms\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)\s*\{[^}]*\.js \.reveal\s*\{[^}]*transform:\s*none/s);
});
