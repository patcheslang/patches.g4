import { test } from "node:test";
import assert from "node:assert/strict";
import antlr4 from "antlr4";
import Lexer from "../../dist/patchesLexer.js";
import Parser from "../../dist/patchesParser.js";
import Transpiler from "../../src/compiler/Transpiler.js";

test("Pipeline Transpilation - Zero Argument", () => {
  const input = "`TINY TIM` |> lower();";
  const tree = parse(input);
  const transpiler = new Transpiler();
  const jsCode = transpiler.transpile(tree);
  
  assert.strictEqual(jsCode, 'runtime.call("lower", [`TINY TIM`]);');
});

test("Pipeline Transpilation - Placeholder", () => {
  const input = "`TINY TIM` |> replace(`TIM`, `TOM`, %);";
  const tree = parse(input);
  const transpiler = new Transpiler();
  const jsCode = transpiler.transpile(tree);
  
  assert.strictEqual(jsCode, 'runtime.call("replace", [`TIM`, `TOM`, `TINY TIM`]);');
});

test("Pipeline Transpilation - Chain", () => {
  const input = "`hello` |> upper() |> reverse();";
  const tree = parse(input);
  const transpiler = new Transpiler();
  const jsCode = transpiler.transpile(tree);
  
  assert.strictEqual(jsCode, 'runtime.call("reverse", [runtime.call("upper", [`hello`])]);');
});

test("Pipeline Transpilation - Mixed Argument with Placeholder", () => {
  const input = "100 |> MOD(%, 3);";
  const tree = parse(input);
  const transpiler = new Transpiler();
  const jsCode = transpiler.transpile(tree);
  
  assert.strictEqual(jsCode, 'runtime.call("MOD", [100, 3]);');
});

test("Pipeline Transpilation - Should throw if arguments present but no placeholder", () => {
  const input = "100 |> MOD(3);";
  const tree = parse(input);
  const transpiler = new Transpiler();
  
  assert.throws(() => {
    transpiler.transpile(tree);
  }, /must use the "%" placeholder/);
});

function parse(input) {
  const chars = new antlr4.InputStream(input);
  const lexer = new Lexer(chars);
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new Parser(tokens);
  return parser.parse();
}
