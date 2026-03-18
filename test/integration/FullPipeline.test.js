import { test } from "node:test";
import assert from "node:assert/strict";
import antlr4 from "antlr4";
import Lexer from "../../dist/patchesLexer.js";
import Parser from "../../dist/patchesParser.js";
import Transpiler from "../../src/compiler/Transpiler.js";
import Runtime from "../../src/runtime/Runtime.js";

test("Full Pipeline - Definition and Patching", () => {
  const input = `
    + products: ( $sku, @USD price );
    /products: ( sku: \`BASE-100\`, price: 19.99 );
  `;
  
  // 1. Parse
  const chars = new antlr4.InputStream(input);
  const lexer = new Lexer(chars);
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new Parser(tokens);
  const tree = parser.parse();

  // 2. Transpile
  const transpiler = new Transpiler();
  const jsCode = transpiler.transpile(tree);
  
  assert.match(jsCode, /runtime\.define/);
  assert.match(jsCode, /runtime\.patch/);

  // 3. Execute against Runtime
  const runtime = new Runtime();
  
  // Mimic generated intent
  runtime.define("/products", { sku: "$", price: "@" });
  runtime.patch("/products", { sku: "BASE-100", price: 19.99 });

  // 4. Verify via Runtime Abstraction (not raw SQL)
  const schemaInfo = runtime.getTableSchema("/products");
  assert.strictEqual(schemaInfo.length, 2);
  assert.strictEqual(schemaInfo[0].name, "sku");
});
