import { test } from "node:test";
import assert from "node:assert/strict";
import { PC_SIZE, layoutPanels } from "../../lib/pcmetrics.ts";

const names = (mode) => layoutPanels(mode).map((p) => p.name);

test("full and bars show seven panels, compact shows four", () => {
  assert.deepEqual(names("full"), ["CPU", "GPU", "RAM", "Network", "Fans & temps", "Disk", "Processes"]);
  assert.deepEqual(names("bars"), names("full"));
  assert.deepEqual(names("compact"), ["CPU", "GPU", "RAM", "Network"]);
});

for (const mode of ["full", "compact", "bars"]) {
  test(`${mode}: every panel is inside the screen and none overlap`, () => {
    const { w, h } = PC_SIZE[mode];
    const panels = layoutPanels(mode);
    for (const p of panels) {
      assert.ok(p.x >= 0 && p.y >= 0 && p.x + p.w <= w + 0.001 && p.y + p.h <= h + 0.001, p.name);
    }
    for (const a of panels) {
      for (const b of panels) {
        if (a === b) continue;
        const apart = a.x + a.w <= b.x + 0.001 || b.x + b.w <= a.x + 0.001 || a.y + a.h <= b.y + 0.001 || b.y + b.h <= a.y + 0.001;
        assert.ok(apart, `${a.name} overlaps ${b.name}`);
      }
    }
  });
}
