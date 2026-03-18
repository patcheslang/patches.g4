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
  define(pathText, schema) {
    const sanitizedPath = PathResolver.sanitize(pathText);
    const internalId = this.#adapter.resolveInternalId(sanitizedPath);
    this.#adapter.createTable(internalId, schema);
    return true;
  }

  /**
   * Main entry point for data updates (patches)
   */
  patch(pathText, data) {
    const sanitizedPath = PathResolver.sanitize(pathText);
    const internalId = this.#adapter.resolveInternalId(sanitizedPath);
    this.#adapter.upsert(internalId, data);
    return true;
  }

  // Internal helper for testing
  query(sql, params = []) {
    return this.#adapter.query(sql, params);
  }

  getTableSchema(pathText) {
    const sanitizedPath = PathResolver.sanitize(pathText);
    const internalId = this.#adapter.resolveInternalId(sanitizedPath);
    return this.#adapter.getTableInfo(internalId);
  }
}
