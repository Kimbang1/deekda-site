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

for (const [lang, file] of [["ko", "index.html"], ["en", "en/index.html"]]) {
  test(`${lang}: hero has a glow and three pulse rings behind the watch`, () => {
    const html = read(file);
    assert.equal(count(html, /class="hero-glow"/g), 1);
    assert.equal(count(html, /class="pulse-ring"/g), 3);
  });
}

for (const [lang, file] of [["ko", "index.html"], ["en", "en/index.html"]]) {
  test(`${lang}: sticky story has three steps and three screens`, () => {
    const html = read(file);
    assert.equal(count(html, /class="story-step"/g), 3);
    assert.equal(count(html, /class="story-screen"/g), 3);
    assert.ok(/class="story"[^>]*data-active="0"/.test(html));
  });
}

for (const [lang, file] of [["ko", "index.html"], ["en", "en/index.html"]]) {
  test(`${lang}: theme switcher is a three-option radio group`, () => {
    const html = read(file);
    assert.equal(count(html, /type="radio"/g), 3);
    assert.ok(html.includes('role="radiogroup"'));
  });
  test(`${lang}: steps and trust rows reveal on scroll`, () => {
    assert.ok(count(read(file), /class="reveal"/g) >= 6);
  });
}

test("ko/en: the mirror caption says the PC shows every metric at once", () => {
  assert.ok(read("index.html").includes("모든 지표"));
  assert.ok(read("en/index.html").toLowerCase().includes("every metric"));
});
