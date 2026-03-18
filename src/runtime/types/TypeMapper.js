export default class TypeMapper {
  static map(patchesType) {
    // Extract only the sigil parts (e.g. @KB -> @)
    const sigil = patchesType.replace(/[^\$\&\#\@\!^?*]+/g, "");
    
    const types = {
      "$": "TEXT",
      "&": "INTEGER", // Boolean as 0/1
      "#": "TEXT",    // Tables as JSON strings for now
      "@": "REAL",    // Custom/Formulaic types as REAL for now
      "@@": "REAL",
    };
    return types[sigil] || "TEXT";
  }
}
