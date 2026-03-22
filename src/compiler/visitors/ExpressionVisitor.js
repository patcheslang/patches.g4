import patchesParserVisitor from "../../../dist/patchesParserVisitor.js";
import DataVisitor from "./DataVisitor.js";

export default class ExpressionVisitor extends patchesParserVisitor {
  #dataVisitor = new DataVisitor();

  visitExpression(ctx) {
    return this.visit(ctx.formulaic());
  }

  visitFormulaic(ctx) {
    const atoms = ctx.atom();
    if (!atoms || atoms.length === 0) return "";

    // Handle single atom with suffixes (like path: batch)
    if (atoms.length === 1) {
      return this.visitAtom(atoms[0]);
    }

    let current = this.visit(atoms[0]);

    for (let i = 1; i < atoms.length; i++) {
      current = this.#applyPipe(current, atoms[i]);
    }

    return current;
  }

  #applyPipe(lhs, rhsAtomCtx) {
    const base = rhsAtomCtx.base();
    const suffixes = rhsAtomCtx.suffix() || [];
    
    // Check if it's a formula call via base.value()
    const value = base.value ? base.value() : null;
    if (value && value.formulaCall && value.formulaCall()) {
      return this.#visitFormulaCallWithPipe(value.formulaCall(), lhs);
    }

    // Check if it's a field followed by a batch suffix (implicit call)
    const field = value ? value.field() : null;
    const batchSuffix = suffixes.find(s => s.batch && s.batch());
    if (field && batchSuffix) {
        return this.#visitImplicitCallWithPipe(field, batchSuffix.batch(), lhs);
    }

    return `// Unsupported pipe RHS: ${rhsAtomCtx.getText()}`;
  }

  #visitImplicitCallWithPipe(fieldCtx, batchCtx, lhs) {
    const name = fieldCtx.getText();
    const items = batchCtx.batchItem() || [];
    
    if (items.length === 0) {
      return `runtime.call("${name}", [${lhs}])`;
    }

    let placeholderFound = false;
    const args = [];
    
    for (const item of items) {
      if (item.getText().trim() === "%") {
        placeholderFound = true;
        args.push(lhs);
      } else {
        const val = this.visit(item);
        if (val !== null) args.push(val);
      }
    }

    if (!placeholderFound) {
      throw new Error(`Pipeline error: Formula "${name}" called with arguments must use the "%" placeholder.`);
    }

    return `runtime.call("${name}", [${args.join(", ")}])`;
  }

  #visitFormulaCallWithPipe(ctx, lhs) {
    const name = this.visit(ctx.identifier());
    const namedArgs = ctx.namedArgument() || [];
    
    if (namedArgs.length === 0) {
      return `runtime.call("${name}", [${lhs}])`;
    }

    let placeholderFound = false;
    const args = [];
    
    for (const arg of namedArgs) {
      if (arg.getText().trim() === "%") {
        placeholderFound = true;
        args.push(lhs);
      } else {
        const val = this.visit(arg);
        if (val !== null) args.push(val);
      }
    }

    if (!placeholderFound) {
      throw new Error(`Pipeline error: Formula "${name}" called with arguments must use the "%" placeholder.`);
    }

    return `runtime.call("${name}", [${args.join(", ")}])`;
  }

  visitFormulaCall(ctx) {
    const name = this.visit(ctx.identifier());
    const namedArgs = ctx.namedArgument() || [];
    const args = namedArgs.map(arg => this.visit(arg)).filter(v => v !== null);
    return `runtime.call("${name}", [${args.join(", ")}])`;
  }

  visitNamedArgument(ctx) {
    return this.visit(ctx.formulaic());
  }

  visitBatchItem(ctx) {
    const formulaic = ctx.formulaic();
    if (formulaic) return this.visit(formulaic);
    return null;
  }

  visitAtom(ctx) {
    const baseCtx = ctx.base();
    const suffixes = ctx.suffix();

    // Pattern recognition: Path followed by Colon followed by Data
    if (baseCtx.path() && suffixes.length > 0) {
      const pathText = baseCtx.path().getText();
      let data = null;

      suffixes.forEach(suffix => {
        if (suffix.getText().trim().startsWith(':')) {
          const formulaicVal = suffix.formulaic();
          if (formulaicVal) {
             const atoms = formulaicVal.atom();
             if (atoms.length === 1) {
                const base = atoms[0].base();
                const block = base && base.block ? base.block() : null;
                const batch = block && block.batch ? block.batch() : null;
                if (batch) {
                   data = this.#dataVisitor.visitBatch(batch);
                }
             }
          }
        }
      });

      if (data) {
        return `runtime.patch("${pathText}", ${JSON.stringify(data)})`;
      }
    }

    return this.visit(baseCtx);
  }

  visitBase(ctx) {
    if (ctx.value && ctx.value()) return this.visit(ctx.value());
    if (ctx.block && ctx.block()) return this.visit(ctx.block());
    if (ctx.path && ctx.path()) return this.visit(ctx.path());
    if (ctx.pattern && ctx.pattern()) return this.visit(ctx.pattern());
    if (ctx.metadata && ctx.metadata()) return this.visit(ctx.metadata());
    if (ctx.sigil && ctx.sigil()) return this.visit(ctx.sigil());
    return ctx.getText();
  }

  visitValue(ctx) {
    if (ctx.stringLiteral && ctx.stringLiteral()) return ctx.getText();
    if (ctx.number && ctx.number()) return ctx.getText();
    if (ctx.formulaCall && ctx.formulaCall()) return this.visit(ctx.formulaCall());
    if (ctx.field && ctx.field()) return this.visit(ctx.field());
    return ctx.getText();
  }

  visitField(ctx) {
    return `runtime.get("${ctx.getText()}")`;
  }

  visitPath(ctx) {
    return ctx.getText();
  }

  visitBlock(ctx) {
    if (ctx.batch && ctx.batch()) return this.visit(ctx.batch());
    return ctx.getText();
  }

  visitBatch(ctx) {
     return JSON.stringify(this.#dataVisitor.visitBatch(ctx));
  }

  visitIdentifier(ctx) {
    const text = ctx.getText();
    if (text.startsWith('"') && text.endsWith('"')) {
      return text.slice(1, -1);
    }
    return text;
  }

  visitMetadata(ctx) {
    return ctx.getText();
  }

  visitSigil(ctx) {
    return ctx.getText();
  }
}
