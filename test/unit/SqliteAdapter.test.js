import { test } from "node:test";
import assert from "node:assert/strict";
import SqliteAdapter from "../../src/runtime/db/SqliteAdapter.js";

test("SqliteAdapter - internal ID resolution", () => {
  const adapter = new SqliteAdapter(":memory:");
  
  const id1 = adapter.resolveInternalId("/users");
  const id2 = adapter.resolveInternalId("/users");
  const id3 = adapter.resolveInternalId("/settings");

  assert.strictEqual(id1, id2, "Same path should yield same ID");
  assert.notStrictEqual(id1, id3, "Different paths should yield different IDs");
  assert.match(id1, /^ptch_/, "ID should have ptch_ prefix");
});

test("SqliteAdapter - creates tables with internal IDs", () => {
  const adapter = new SqliteAdapter(":memory:");
  const id = adapter.resolveInternalId("/users");
  
  adapter.createTable(id, { name: "$" });
  const info = adapter.getTableInfo(id);
  assert.strictEqual(info.length, 1);
  assert.strictEqual(info[0].name, "name");
});
