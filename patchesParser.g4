parser grammar patchesParser;

options { tokenVocab = patchesLexer; }

parse: statement* EOF;

statement: (patchDef | expression) Semicolon?;

// 1. Top-Level Definition
patchDef: Plus formulaic annotation?;

// 2. Executable Expression
expression: formulaicPiped annotation?;

// 3. Pipe Chain
formulaicPiped: formulaic (Pipe formulaic)*;

// 4. Base + Suffixes
formulaic: base suffix*;

// 5. Atoms
base: value | block | path | pattern | metadata | sigil;

value: formulaCall | field | stringLiteral | number | message;

sigil: TypeString | TypeBoolean | TypeTable | TypeFormulaic | TypeCustom | Bang | Caret | Question;

number: DecimalInteger | HexInteger | OctalInteger | Decimal;

message: MESSAGE_OPEN MESSAGE_CONTENT? MESSAGE_CLOSE; // Obsolete but kept for now

stringLiteral: STRING_OPEN (STRING_CONTENT | STRING_INTERP_OPEN formulaic CurlyClose)* STRING_CLOSE;

field: ParentCall* (identifier Dot)? modifier* type? identifier;

identifier: Name | QuotedName;

metadata: Input | Model | Matched | Caught | Placeholder;

formulaCall: (FormulaChar | field ParenOpen) (namedArgument (Comma namedArgument)* Comma?)? ParenClose;

namedArgument: (identifier Assign)? formulaic;

block: batch | hatch | table;

batch: ParenOpen (batchItem (Comma batchItem)* Comma?)? ParenClose;

batchItem: modifier* type? identifier constraint? (Assign formulaic)? annotation?
         | formulaic;

modifier: Bang | Caret | Question;

constraint: Unique | Primary | Incr;

type: sigil | (TypeCustom identifier (ParenOpen namedArgument? (Comma namedArgument)* Comma? ParenClose)?);

hatch: CurlyOpen statement* CurlyClose;

table: TableOpen tableRow (RowDivider tableRow)* TableClose;
tableRow: formulaic? (Comma formulaic)* Comma?;

// 6. Suffixes (Dispatches, Schema Attachments)
suffix: Assign formulaic
      | TableOpen formulaic watch? TableClose // snatch
      | hatch
      | batch;

watch: Bang;

// 7. Paths
path: pathOpen pathSection ((pathDirect | pathDig) pathSection)*;
pathOpen: PATH_Relative_Open | PATH_Root_Open | PATH_Parent_Open | PATH_Current_Open;
pathDirect: PATH_Dir;
pathDig: PATH_Dig;
pathSection: PATH_Name+ | PATH_FieldOpen formulaic CurlyClose;

// 8. Patterns
pattern: PATTERN_Open (PATTERN_Part | PATTERN_FieldOpen formulaic CurlyClose)* PATTERN_Close Name?;

// 9. Annotations
annotation: ANNOTATION_OPEN ANNOTATION_CONTENT? ANNOTATION_CLOSE;
