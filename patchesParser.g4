parser grammar patchesParser;

options { tokenVocab = patchesLexer; }

parse: statement* EOF;

statement: (patchDef | expression | hatchCommand) Semicolon?;

// --- 1. Top-Level Definition ---
// PATCH: <CATCH> [ATTACH] (BATCH) {HATCH}
patchDef: Plus formulaic;
// identifier (Colon type)? (TableOpen identifier TableClose)? (batch)? hatch;

// --- 2. Executable Expression ---
expression: formulaic annotation?;

// --- 3. Full Piped Chain ---
formulaic: atom (Pipe atom)*;

// --- 4. Base + Suffixes ---
atom: base suffix*;

// --- 5. Atoms ---
base: value | block | path | pattern | metadata | sigil;

value: field | formulaCall | exceptionalCall | stringLiteral | number | message | heredoc;

sigil: TypeString | TypeBoolean | TypeTable | TypeFormulaic | TypeCustom 
     | Bang | Caret | Question | Star | metadata | Plus | Pipe | RowDivider | Dot | FormulaChar;

number: HexInteger | OctalInteger | Decimal | DecimalInteger;

message: MESSAGE_OPEN (Name | Semicolon | Dot | Bang)* MESSAGE_CLOSE;

heredoc: HEREDOC_OPEN HEREDOC_CONTENT? HEREDOC_CLOSE;

stringLiteral: STRING_OPEN (STRING_CONTENT | STRING_INTERP_OPEN formulaic CurlyClose)* STRING_CLOSE;

field: ParentCall* (identifier Dot)? modifier* type? identifier;

identifier: Name | QuotedName;

metadata: Input | Model | Matched | Caught | Placeholder;

// Standard Formula: NAME(BATCH)
formulaCall: identifier ParenOpen (namedArgument (Comma namedArgument)* Comma?)? ParenClose;

// Exceptional Formula: NAME:(<CATCH> [SNATCH] (BATCH))
exceptionalCall: identifier Colon ParenOpen (catchRef)? (TableOpen formulaic TableClose)? (batch)? ParenClose;

catchRef: LessThan identifier GreaterThan;

namedArgument: (identifier Colon)? formulaic;

block: (batch | hatch | table) Name?;

batch: ParenOpen (batchItem (Comma batchItem)* Comma?)? ParenClose;

batchItem: modifier* (type identifier | identifier | type) constraint* (Colon formulaic)? annotation?
         | formulaic;

modifier: Bang | Caret | Question;

constraint: Star+;

type: sigil | (TypeCustom identifier (ParenOpen namedArgument? (Comma namedArgument)* Comma? ParenClose)?);

hatch: CurlyOpen statement* CurlyClose;

// Hatch Commands (The Four Bangs)
hatchCommand: formulaic? (Bang Bang Bang Bang
                        | Bang Bang Bang
                        | Bang Bang
                        | Bang
                        );

// Table: (Batch) [Data]
table: (batch)? TableOpen tableRow (RowDivider tableRow)* TableClose;
tableRow: formulaic? (Comma formulaic)* Comma?;

// --- 6. Suffixes ---
suffix: Colon formulaic
      | TableOpen formulaic TableClose // Data or Snatch context
      | hatch
      | batch
      | modifier
      | constraint;

// --- 7. Paths ---
path: pathOpen pathSection ((pathDirect | pathDig) pathSection)*;
pathOpen: PATH_Relative_Open | PATH_Root_Open | PATH_Parent_Open | PATH_Current_Open;
pathDirect: PATH_Dir;
pathDig: PATH_Dig;
pathSection: PATH_Name+ | PATH_FieldOpen formulaic CurlyClose;

// --- 8. Patterns ---
pattern: PATTERN_Open (PATTERN_Part | PATTERN_FieldOpen formulaic CurlyClose)* PATTERN_Close Name?;

// --- 9. Annotations ---
annotation: ANNOTATION_OPEN ANNOTATION_CONTENT? ANNOTATION_CLOSE;
