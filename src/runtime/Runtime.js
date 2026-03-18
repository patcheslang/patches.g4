import SqliteAdapter from "./db/SqliteAdapter.js";
import PathResolver from "./core/PathResolver.js";

export default class Runtime {
  #adapter;

  constructor(dbPath = ":memory:") {
    this.#adapter = new SqliteAdapter(dbPath);
  }

  /**
   * Main entry point for definition statements (+)
   */
  define(path, schema) {
    const name = PathResolver.resolve(path);
    this.#adapter.createTable(name, schema);
    return true;
  }

  /**
   * Main entry point for data updates (patches)
   */
  patch(path, data) {
    const name = PathResolver.resolve(path);
    this.#adapter.upsert(name, data);
    return true;
  }

  // Internal helper for testing
  query(sql, params = []) {
    return this.#adapter.query(sql, params);
  }

  getTableSchema(path) {
    const name = PathResolver.resolve(path);
    return this.#adapter.getTableInfo(name);
  }
}
