import { DatabaseSync } from "node:sqlite";
import TypeMapper from "../types/TypeMapper.js";

export default class SqliteAdapter {
  #db;

  constructor(dbPath = ":memory:") {
    this.#db = new DatabaseSync(dbPath);
    this.#initRegistry();
  }

  #initRegistry() {
    this.#db.exec(`
      CREATE TABLE IF NOT EXISTS "__patches_registry__" (
        "path" TEXT PRIMARY KEY,
        "internal_id" TEXT UNIQUE
      )
    `);
  }

  /**
   * Resolves a Patches path to a safe internal SQLite table name.
   */
  resolveInternalId(path) {
    const existing = this.#db.prepare(
      'SELECT internal_id FROM "__patches_registry__" WHERE path = ?'
    ).get(path);

    if (existing) return existing.internal_id;

    // Generate a new deterministic ID (using simple hash for now)
    const id = "ptch_" + Math.random().toString(36).substring(2, 9);
    this.#db.prepare(
      'INSERT INTO "__patches_registry__" (path, internal_id) VALUES (?, ?)'
    ).run(path, id);

    return id;
  }

  createTable(name, schema) {
    const columns = Object.entries(schema)
      .map(([col, type]) => {
        const sqlType = TypeMapper.map(type);
        return `"${col}" ${sqlType}`;
      })
      .join(", ");

    const sql = `CREATE TABLE IF NOT EXISTS "${name}" (${columns})`;
    this.#db.exec(sql);
  }

  upsert(name, data) {
    const keys = Object.keys(data);
    const placeholders = keys.map(() => "?").join(", ");
    const columns = keys.map(k => `"${k}"`).join(", ");
    const values = Object.values(data);

    const sql = `INSERT INTO "${name}" (${columns}) VALUES (${placeholders})`;
    const stmt = this.#db.prepare(sql);
    stmt.run(...values);
  }

  query(sql, params = []) {
    return this.#db.prepare(sql).all(...params);
  }

  getTableInfo(name) {
    return this.#db.prepare(`PRAGMA table_info("${name}")`).all();
  }
}
