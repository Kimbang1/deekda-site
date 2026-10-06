import { test } from "node:test";
import assert from "node:assert/strict";
import { pickActive } from "../../lib/story.ts";

test("pickActive: first visible step wins", () => {
  assert.equal(pickActive([false, true, false], 0), 1);
  assert.equal(pickActive([true, true, false], 2), 0);
});

test("pickActive: nothing visible keeps the previous step (no flicker between steps)", () => {
  assert.equal(pickActive([false, false, false], 2), 2);
});
