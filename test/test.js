import fs from "node:fs";
import path from "node:path";
import antlr4 from "antlr4";
import Lexer from "../dist/patchesLexer.js";
import Parser from "../dist/patchesParser.js";

const samplesDir = "./test/samples";
const files = fs.readdirSync(samplesDir).filter(f => f.endsWith(".ppl")).sort();

console.log("=== RUNNING OFFICIAL SAMPLES ===");

files.forEach(file => {
    const filePath = path.join(samplesDir, file);
    const content = fs.readFileSync(filePath, "utf8");
    
    const chars = new antlr4.InputStream(content);
    const lexer = new Lexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new Parser(tokens);
    
    parser.removeErrorListeners();
    parser.addErrorListener({
        syntaxError: (recognizer, offendingSymbol, line, column, msg, e) => {
            console.error(`  [SYNTAX ERROR] ${file}:${line}:${column} - ${msg}`);
        },
        reportAmbiguity: () => {},
        reportAttemptingFullContext: () => {},
        reportContextSensitivity: () => {}
    });

    try {
        parser.parse();
        if (parser.syntaxErrorsCount === 0) {
            console.log(`  [PASS] ${file}`);
        } else {
            console.log(`  [FAIL] ${file} (${parser.syntaxErrorsCount} errors)`);
        }
    } catch (e) {
        console.error(`  [FATAL ERROR] ${file}:`, e.message);
    }
});
