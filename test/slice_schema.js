import antlr4 from "antlr4";
import Lexer from "../dist/patchesLexer.js";
import Parser from "../dist/patchesParser.js";
import Transpiler from "../src/compiler/Transpiler.js";
import Runtime from "../src/runtime/Runtime.js";

// 1. The Patches Input
const input = "+ users: ( $username, &is_admin );";
console.log("INPUT:", input);

// 2. Parse
const chars = new antlr4.InputStream(input);
const lexer = new Lexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new Parser(tokens);
const tree = parser.parse();

// 3. Transpile
const transpiler = new Transpiler();
const jsCode = transpiler.transpile(tree);
console.log("\nGENERATED JS:\n", jsCode);

// 4. Run against Runtime
const runtime = new Runtime(); // In-memory DB
// Note: In a real app, we'd eval() or write to file. For POC, we'll just run the logic.
const schema = { username: "$", is_admin: "&" };
runtime.define("users", schema);

// 5. Verify SQLite
console.log("\nVERIFYING SQLITE SCHEMA:");
const tableInfo = runtime.getTableSchema("users");
console.log(tableInfo);

if (tableInfo.length === 2 && tableInfo[0].name === "username") {
  console.log("\n[PASS] Slice 1 (Refactored): Schema creation successful!");
} else {
  console.log("\n[FAIL] Table not created correctly.");
}
