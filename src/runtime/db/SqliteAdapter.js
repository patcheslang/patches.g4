import { DatabaseSync } from "node:sqlite";
import TypeMapper from "../types/TypeMapper.js";

export default class SqliteAdapter {
  #db;

  constructor(dbPath = ":memory:") {
    this.#db = new DatabaseSync(dbPath);
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
