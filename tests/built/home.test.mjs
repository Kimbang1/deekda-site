import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL(`../../out/${file}`, import.meta.url), "utf8");
const svgOf = (html, mode) => (html.match(new RegExp(`<svg[^>]*data-pc="${mode}"[\\s\\S]*?</svg>`)) ?? [""])[0];
const count = (text, re) => (text.match(re) ?? []).length;

for (const [lang, file] of [["ko", "index.html"], ["en", "en/index.html"]]) {
  test(`${lang}: PC screens - full has 7 labelled panels, compact 4, hero bars 7 with no text`, () => {
    const html = read(file);
    const full = svgOf(html, "full"), compact = svgOf(html, "compact"), bars = svgOf(html, "bars");
    assert.equal(count(full, /data-panel="/g), 7);
    assert.equal(count(compact, /data-panel="/g), 4);
    assert.equal(count(bars, /data-panel="/g), 7);
    for (const word of ["GHz", "VRAM", "rpm", "Mbps", "MB/s"]) assert.ok(full.includes(word), word);
    assert.equal(count(bars, /<text/g), 0);
  });
}

test("ko/en: the mirror caption says the PC shows every metric at once", () => {
  assert.ok(read("index.html").includes("모든 지표"));
  assert.ok(read("en/index.html").toLowerCase().includes("every metric"));
});
