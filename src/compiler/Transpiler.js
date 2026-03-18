import patchesParserVisitor from "../../dist/patchesParserVisitor.js";
import DefinitionVisitor from "./visitors/DefinitionVisitor.js";
import ExpressionVisitor from "./visitors/ExpressionVisitor.js";

export default class Transpiler extends patchesParserVisitor {
  #defVisitor = new DefinitionVisitor();
  #exprVisitor = new ExpressionVisitor();

  transpile(tree) {
    return this.visit(tree);
  }

  visitParse(ctx) {
    return ctx.statement()
      .map(stmt => this.visit(stmt))
      .filter(s => s !== null && s !== "")
      .join("\n");
  }

  visitStatement(ctx) {
    if (ctx.patchDef()) {
      return this.#defVisitor.visitPatchDef(ctx.patchDef());
    }
    if (ctx.expression()) {
      return this.#exprVisitor.visitExpression(ctx.expression());
    }
    return "";
  }
}
