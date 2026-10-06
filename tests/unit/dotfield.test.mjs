import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ACCENT, ACCENT_EVENT, ALPHA, DOT, buildGrid, dotAlpha, dotRadius, gridSpacingFor, mixRgb, parseHex, reactionAt, reactionEnabled, rgba,
} from "../../lib/dotfield.ts";

test("buildGrid: 240x120 at 24px is a 10x5 grid centered in its cells", () => {
  const dots = buildGrid(240, 120, 24);
  assert.equal(dots.length, 50);
  assert.deepEqual(dots[0], { cx: 12, cy: 12 });
  assert.deepEqual(dots[49], { cx: 228, cy: 108 });
});

test("gridSpacingFor: a normal viewport keeps 24px", () => {
  assert.equal(gridSpacingFor(1440, 900), 24);
});

test("gridSpacingFor: an 8K viewport widens the spacing so the grid stays under 5000 dots", () => {
  const spacing = gridSpacingFor(7680, 4320);
  assert.ok(spacing > 24);
  assert.ok(buildGrid(7680, 4320).length <= 5000, String(buildGrid(7680, 4320).length));
});

test("reactionAt: no pointer or a far pointer means no reaction", () => {
  assert.deepEqual(reactionAt({ cx: 50, cy: 50 }, null), { strength: 0, dx: 0, dy: 0 });
  assert.deepEqual(reactionAt({ cx: 50, cy: 50 }, { x: 1000, y: 1000 }), { strength: 0, dx: 0, dy: 0 });
});

test("reactionAt: a dot right of the pointer is pushed right, never more than push", () => {
  const r = reactionAt({ cx: 100, cy: 100 }, { x: 60, y: 100 });
  assert.ok(r.strength > 0 && r.strength < 1);
  assert.ok(r.dx > 0 && Math.abs(r.dy) < 1e-9);
  assert.ok(Math.hypot(r.dx, r.dy) <= DOT.push);
});

test("reactionAt: a pointer exactly on a dot gives full strength and finite zero push", () => {
  const r = reactionAt({ cx: 100, cy: 100 }, { x: 100, y: 100 });
  assert.equal(r.strength, 1);
  assert.equal(r.dx, 0);
  assert.equal(r.dy, 0);
});

test("dotAlpha / dotRadius: idle 0.25 -> max 0.35 (spec cap), radius doubles", () => {
  assert.equal(dotAlpha(0), ALPHA.idle);
  assert.ok(dotAlpha(1) <= 0.35);
  assert.equal(dotRadius(0), DOT.radius);
  assert.equal(dotRadius(1), DOT.radius * 2);
});

test("parseHex: valid #rrggbb parses, anything else is null", () => {
  assert.deepEqual(parseHex("#22D3EE"), [34, 211, 238]);
  for (const bad of ["22D3EE", "#22D3E", "#GGGGGG", "red", "", "#22D3EE; drop"]) assert.equal(parseHex(bad), null, bad);
});

test("mixRgb: midpoint rounds, t is clamped, inputs are not mutated", () => {
  const a = [0, 0, 0], b = [255, 255, 255];
  assert.deepEqual(mixRgb(a, b, 0.5), [128, 128, 128]);
  assert.deepEqual(mixRgb(a, b, -3), [0, 0, 0]);
  assert.deepEqual(mixRgb(a, b, 9), [255, 255, 255]);
  assert.deepEqual(a, [0, 0, 0]);
});

test("rgba: formats a canvas color", () => {
  assert.equal(rgba([1, 2, 3], 0.25), "rgba(1, 2, 3, 0.25)");
});

test("reactionEnabled: only hover + fine pointer + no reduced motion", () => {
  assert.equal(reactionEnabled({ hover: true, finePointer: true, reducedMotion: false }), true);
  assert.equal(reactionEnabled({ hover: false, finePointer: true, reducedMotion: false }), false);
  assert.equal(reactionEnabled({ hover: true, finePointer: false, reducedMotion: false }), false);
  assert.equal(reactionEnabled({ hover: true, finePointer: true, reducedMotion: true }), false);
});

test("ACCENT: three themes with valid hex values and a stable event name", () => {
  assert.deepEqual(Object.keys(ACCENT), ["modern", "matrix", "neon"]);
  for (const hex of Object.values(ACCENT)) assert.ok(parseHex(hex));
  assert.equal(ACCENT_EVENT, "deekda-accent");
});
