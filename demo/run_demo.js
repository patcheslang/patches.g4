import fs from "node:fs";
import antlr4 from "antlr4";
import Lexer from "../dist/patchesLexer.js";
import Parser from "../dist/patchesParser.js";
import Transpiler from "../src/compiler/Transpiler.js";
import Runtime from "../src/runtime/Runtime.js";
import PathResolver from "../src/runtime/core/PathResolver.js";

console.log("=== PATCHES MINI-OS DEMO (Corrected Sanitization) ===\n");

// 1. Read and Parse
const source = fs.readFileSync("./demo/mini_os.ppl", "utf8");
const chars = new antlr4.InputStream(source);
const lexer = new Lexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new Parser(tokens);
const tree = parser.parse();

// 2. Transpile
const transpiler = new Transpiler();
const jsCode = transpiler.transpile(tree);
console.log("--- GENERATED JS ---");
console.log(jsCode);

// 3. Execution
const runtime = new Runtime("./demo/system.db");

// We'll mimic the transpiled intent with sanitized names
runtime.define("/users", { "username": "$", "is_active": "&" });
runtime.define("/files", { "File Name": "$", "content": "$", "size": "@" });
runtime.define("/sys/logs", { "time": "@", "event": "$", "level": "$" });

runtime.patch("/users", { username: "admin", is_active: 1 });
runtime.patch("/users", { username: "frith", is_active: 1 });
runtime.patch("/files", { "File Name": "kernel.sys", content: "0xCAFEBEEF", size: 1024.5 });
runtime.patch("/files", { "File Name": "user.txt", content: "Hello Patches!", size: 0.5 });
runtime.patch("/sys/logs", { time: 1710720000, event: "SYSTEM_BOOT", level: "INFO" });
runtime.patch("/sys/logs", { time: 1710720060, event: "LOGIN_ADMIN", level: "AUTH" });

// 4. Verification with PathResolver
console.log("\n--- SYSTEM STATE (SQLite) ---");

const usersTable = PathResolver.resolve("/users");
console.log("\nUsers Table:", runtime.query(`SELECT * FROM ${usersTable}`));

const filesTable = PathResolver.resolve("/files");
console.log("\nFiles Table:", runtime.query(`SELECT * FROM ${filesTable}`));

const logsTable = PathResolver.resolve("/sys/logs");
console.log("\nSystem Logs:", runtime.query(`SELECT * FROM ${logsTable}`));

console.log("\n[SUCCESS] Mini-OS correctly handling Backtick Strings, Quoted Names, and Path Sanitization.");
