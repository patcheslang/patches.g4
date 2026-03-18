import antlr4 from "antlr4";
import Lexer from "../dist/patchesLexer.js";
import Parser from "../dist/patchesParser.js";
import Transpiler from "../src/compiler/Transpiler.js";
import Runtime from "../src/runtime/Runtime.js";
import PathResolver from "../src/runtime/core/PathResolver.js";

// 1. The Patches Input (Define then Write)
const input = `
+ users: ( $username, &is_admin );
/users: ( username: "frith", is_admin: 1 );
`;
console.log("INPUT:\n", input.trim());

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

// Note: In a real app, we'd eval(jsCode).
runtime.define("users", { username: "$", is_admin: "&" });
runtime.patch("/users", { username: "frith", is_admin: 1 });

// 5. Verify SQLite
console.log("\nVERIFYING SQLITE DATA:");
const tableName = PathResolver.resolve("users");
const results = runtime.query(`SELECT * FROM ${tableName}`);
console.log(results);

if (results.length === 1 && results[0].username === "frith") {
  console.log("\n[PASS] Slice 2: Writing data successful!");
} else {
  console.log("\n[FAIL] Data not written correctly.");
}
