export default class PathResolver {
  /**
   * Translates a Patches path (/users/1) into a SQLite-compatible table/context name.
   */
  static resolve(pathText) {
    // Strip leading dots and slashes (./, ../, /, //)
    return pathText.replace(/^[./\\]+/, "").replace(/\//g, "_");
  }
}
