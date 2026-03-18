import { test } from "node:test";
import assert from "node:assert/strict";
import SqliteAdapter from "../../src/runtime/db/SqliteAdapter.js";

test("SqliteAdapter - creates tables and inserts data", () => {
  const adapter = new SqliteAdapter(":memory:");
  
  // 1. Create
  adapter.createTable("test_table", { id: "$", count: "&" });
  const info = adapter.getTableInfo("test_table");
  assert.strictEqual(info.length, 2);
  assert.strictEqual(info[0].name, "id");

  // 2. Insert
  adapter.upsert("test_table", { id: "alpha", count: 42 });
  const results = adapter.query("SELECT * FROM test_table");
  assert.strictEqual(results.length, 1);
  assert.strictEqual(results[0].id, "alpha");
  assert.strictEqual(results[0].count, 42);
});
