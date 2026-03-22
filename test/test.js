import fs from "node:fs";
import path from "node:path";
import antlr4 from "antlr4";
import Lexer from "../dist/patchesLexer.js";
import Parser from "../dist/patchesParser.js";

const testDir = "./test/canonical";
const files = fs.readdirSync(testDir)
    .filter(f => f.endsWith(".ppl"))
    .sort();

console.log("=== CANONICAL SYNTAX CHECK ===");

files.forEach(file => {
    const filePath = path.join(testDir, file);
    const content = fs.readFileSync(filePath, "utf8");
    
    const chars = new antlr4.InputStream(content);
    const lexer = new Lexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new Parser(tokens);
    
    parser.removeErrorListeners();
    let hasError = false;
    parser.addErrorListener({
        syntaxError: (recognizer, offendingSymbol, line, column, msg, e) => {
            hasError = true;
            console.error(`  [FAIL] ${file}:${line}:${column} - ${msg}`);
        },
        reportAmbiguity: () => {},
        reportAttemptingFullContext: () => {},
        reportContextSensitivity: () => {}
    });

    try {
        parser.parse();
        if (!hasError) {
            console.log(`  [PASS] ${file}`);
        }
    } catch (e) {
        console.error(`  [FATAL] ${file}:`, e.message);
    }
});
