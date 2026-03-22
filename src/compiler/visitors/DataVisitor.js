import patchesParserVisitor from "../../../dist/patchesParserVisitor.js";

export default class DataVisitor extends patchesParserVisitor {
  visitBatch(ctx) {
    const data = {};
    const items = ctx.batchItem();
    
    items.forEach(item => {
      const idCtx = item.identifier ? item.identifier() : null;
      const name = idCtx?.getText();
      if (name) {
        if (item.Colon && item.Colon()) {
          const formulaicVal = item.formulaic();
          data[this.#cleanName(name)] = this.#getLiteralValue(formulaicVal);
        } else {
          data[this.#cleanName(name)] = item.type()?.getText() || "$"; 
        }
      }
    });
    
    return data;
  }

  #cleanName(name) {
    if (name.startsWith('"') && name.endsWith('"')) {
      return name.slice(1, -1);
    }
    return name;
  }

  #getLiteralValue(ctx) {
    const atoms = ctx.atom();
    if (!atoms || atoms.length === 0) return ctx.getText();
    const base = atoms[0].base();
    const value = base.value ? base.value() : null;
    if (value) {
      if (value.stringLiteral()) {
        const text = value.stringLiteral().getText();
        if (text.startsWith('`') && text.endsWith('`')) {
          return text.slice(1, -1);
        }
        return text;
      }
      if (value.field()) {
        const fieldText = value.field().getText();
        return this.#cleanName(fieldText);
      }
      if (value.number()) {
        const numCtx = value.number();
        const text = numCtx.getText();
        if (numCtx.Decimal()) return parseFloat(text);
        if (numCtx.HexInteger()) return parseInt(text, 16);
        if (numCtx.OctalInteger()) return parseInt(text, 8);
        return parseInt(text, 10);
      }
    }
    return ctx.getText();
  }
}
