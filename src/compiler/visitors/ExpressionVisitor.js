import patchesParserVisitor from "../../../dist/patchesParserVisitor.js";
import DataVisitor from "./DataVisitor.js";

export default class ExpressionVisitor extends patchesParserVisitor {
  #dataVisitor = new DataVisitor();

  visitExpression(ctx) {
    return this.visit(ctx.formulaicPiped());
  }

  visitFormulaicPiped(ctx) {
    const formulaics = ctx.formulaic();
    if (formulaics.length === 1) {
      return this.visitFormulaic(formulaics[0]);
    }
    // Handle pipes later
    return `// Piped expression ignored for now`;
  }

  visitFormulaic(ctx) {
    const baseCtx = ctx.base();
    const suffixes = ctx.suffix();

    // Pattern recognition: Path followed by Assign followed by Data
    if (baseCtx.path() && suffixes.length > 0) {
      const pathText = baseCtx.path().getText();
      let data = null;

      suffixes.forEach(suffix => {
        if (suffix.Assign()) {
          const body = suffix.formulaic()?.base()?.block()?.batch();
          if (body) {
            data = this.#dataVisitor.visitBatch(body);
          }
        }
      });

      if (data) {
        return `runtime.patch("${pathText}", ${JSON.stringify(data)});`;
      }
    }

    return `// Generic formulaic expression ignored: ${ctx.getText()}`;
  }
}
