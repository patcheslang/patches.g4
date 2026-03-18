import patchesParserVisitor from "../../../dist/patchesParserVisitor.js";
import DataVisitor from "./DataVisitor.js";

export default class DefinitionVisitor extends patchesParserVisitor {
  #dataVisitor = new DataVisitor();

  visitPatchDef(ctx) {
    const formulaicCtx = ctx.formulaic();
    const baseText = formulaicCtx.base().getText();
    let tableName = baseText;
    let schema = null;

    const suffixes = formulaicCtx.suffix();
    suffixes.forEach(suffix => {
      if (suffix.batch()) {
        schema = this.#dataVisitor.visitBatch(suffix.batch());
      } else if (suffix.Assign()) {
        const assignedFormulaic = suffix.formulaic();
        const batchBody = assignedFormulaic?.base()?.block()?.batch();
        if (batchBody) {
          schema = this.#dataVisitor.visitBatch(batchBody);
        }
      }
    });

    if (!schema) return `// Ignored non-schema definition for ${tableName}`;

    return `runtime.define("${tableName}", ${JSON.stringify(schema)});`;
  }
}
