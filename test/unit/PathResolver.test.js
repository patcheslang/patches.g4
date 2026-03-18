import { test } from "node:test";
import assert from "node:assert/strict";
import PathResolver from "../../src/runtime/core/PathResolver.js";

test("PathResolver - strips leading slashes", () => {
  assert.strictEqual(PathResolver.resolve("/users"), "users");
  assert.strictEqual(PathResolver.resolve("///users"), "users");
});

test("PathResolver - converts deep paths to underscores", () => {
  assert.strictEqual(PathResolver.resolve("/users/profile/settings"), "users_profile_settings");
});

test("PathResolver - handles relative paths", () => {
  assert.strictEqual(PathResolver.resolve("./local"), "local");
  assert.strictEqual(PathResolver.resolve("../parent"), "parent");
});
