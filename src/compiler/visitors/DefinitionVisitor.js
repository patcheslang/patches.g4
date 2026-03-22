import patchesParserVisitor from "../../../dist/patchesParserVisitor.js";
import DataVisitor from "./DataVisitor.js";

export default class DefinitionVisitor extends patchesParserVisitor {
  #dataVisitor = new DataVisitor();

  visitPatchDef(ctx) {
    const formulaicCtx = ctx.formulaic();
    const atoms = formulaicCtx.atom();
    if (!atoms || atoms.length === 0) return "";
    
    const firstAtom = atoms[0];
    const baseText = firstAtom.base().getText();
    let tableName = baseText;
    let schema = null;

    const suffixes = firstAtom.suffix();
    suffixes.forEach(suffix => {
      if (suffix.batch()) {
        schema = this.#dataVisitor.visitBatch(suffix.batch());
      } else if (suffix.Colon()) {
        const assignedFormulaic = suffix.formulaic();
        if (assignedFormulaic) {
          const innerAtoms = assignedFormulaic.atom();
          if (innerAtoms.length > 0) {
            const batchBody = innerAtoms[0].base()?.block()?.batch();
            if (batchBody) {
              schema = this.#dataVisitor.visitBatch(batchBody);
            }
          }
        }
      }
    });

    if (!schema) return `// Ignored non-schema definition for ${tableName}`;

    return `runtime.define("${tableName}", ${JSON.stringify(schema)});`;
  }
}
