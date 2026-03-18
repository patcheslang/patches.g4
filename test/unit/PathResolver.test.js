import { test } from "node:test";
import assert from "node:assert/strict";
import PathResolver from "../../src/runtime/core/PathResolver.js";

test("PathResolver - sanitizes paths to start with /", () => {
  assert.strictEqual(PathResolver.sanitize("users"), "/users");
  assert.strictEqual(PathResolver.sanitize("./users"), "/users");
  assert.strictEqual(PathResolver.sanitize("../users"), "/users");
  assert.strictEqual(PathResolver.sanitize("///users"), "/users");
});

test("PathResolver - preserves deep hierarchy", () => {
  assert.strictEqual(PathResolver.sanitize("/users/profile/settings"), "/users/profile/settings");
});
