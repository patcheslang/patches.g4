1. README.md: User-oriented high-level language definition
2. VISION.md: Designer-oriented general language description
3. SPEC.md: Model-oriented collection of design decisions and specifications
4. Lexer/Parser: Antlr-compatible definition of the language
5. test/canonical: Collection of sample code
6. test/: Automated testing suite for lexer, parser, and sample code

## Iterative Alignment Plan

**Phase 1: Discovery & Documentation Alignment**
- [ ] Review `VISION.md` and extract the core syntax definitions (e.g., `MATCH:(<CATCH> [SNATCH] (BATCH))`, `~: { ... }`, `EXIT:()`).
- [ ] Align `README.md` with `VISION.md` so the user-facing definitions perfectly match the designer's vision. Discard the "relational literal" hallucination if it contradicts `VISION.md`.
- [ ] Create `SPEC.md` to formally document the agreed-upon syntax decisions (e.g., how pipes work, how `[` acts as a Snatch, how `!` modifiers work).

**Phase 2: Grammar Refactoring**
- [ ] Completely overhaul `patchesLexer.g4` to match the specifications in `VISION.md` (e.g., `<CATCH>`, `[SNATCH]`, `(BATCH)`, `!pos`, `!!pos`, `[*]`, etc.).
- [ ] Overhaul `patchesParser.g4` to parse the structural shapes defined in `VISION.md` (e.g., the `MATCH:(<CATCH> [SNATCH] (BATCH))` formula calls and the `MATCH: <CATCH> [ATTACH] (BATCH) {HATCH}` patch definitions).

**Phase 3: Canonical Tasks Implementation**
- [ ] Implement `01_hello_world.ppl` using the precise syntax defined in `VISION.md` (e.g., `INFO:((`Hello, world!`))`).
- [ ] Implement `02_fizzbuzz.ppl` iteratively, consulting the syntax defined in `VISION.md` (e.g., `MOD()`, `IF()`, `..(1, 100)`).
- [ ] Continue through the canonical tasks, refining the grammar as edge cases emerge.

**Phase 4: Test Suite Integration**
- [ ] Configure the `test/` automated suite to parse the `test/canonical` files against the new grammar.
- [ ] Ensure 100% parse success for all canonical files.
