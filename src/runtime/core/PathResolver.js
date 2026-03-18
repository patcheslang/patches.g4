export default class PathResolver {
  /**
   * Sanitizes a Patches path (/users/1) into a standard normalized string.
   */
  static sanitize(pathText) {
    // Standardize leading slashes and separators
    let normalized = pathText.replace(/^[./\\]+/, "/");
    if (!normalized.startsWith("/")) normalized = "/" + normalized;
    return normalized;
  }
}
