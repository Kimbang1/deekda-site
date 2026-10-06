import { test } from "node:test";
import assert from "node:assert/strict";
import { tiltAngles } from "../../lib/tilt.ts";

test("tiltAngles: the viewport center is flat", () => {
  const a = tiltAngles(720, 450, 1440, 900);
  assert.equal(a.rx, 0);
  assert.equal(a.ry, 0);
});

test("tiltAngles: right edge tilts +max around Y, bottom edge tilts -max around X", () => {
  assert.deepEqual(tiltAngles(1440, 450, 1440, 900), { rx: 0, ry: 5 });
  assert.deepEqual(tiltAngles(720, 900, 1440, 900), { rx: -5, ry: 0 });
});

test("tiltAngles: never exceeds max, even for pointers outside the viewport", () => {
  const a = tiltAngles(99999, -99999, 1440, 900, 5);
  assert.equal(a.ry, 5);
  assert.equal(a.rx, 5);
});
