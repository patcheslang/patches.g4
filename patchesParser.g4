parser grammar patchesParser;

options { tokenVocab = patchesLexer; }

parse: (patchDef | freeFormulaic)* EOF;

freeFormulaic: formulaicPiped;

formula: batch? CurlyOpen formulaicPiped CurlyClose;
formulaicPiped: formulaic piped?;
pipeTerm: return | fork;
fork: Bang Bang;
return: Bang;

piped: (Comma | Semicolon) alias? formulaicPiped;
alias: name Assign;

formulaic: field | table | number | message | input | model | matched | caught | placeholder | nulll | formulaCall | exceptional;

formulaCall: formulaName formulaCallItem? (Comma formulaCallItem)* ParenClose;
formulaName: (field ParenOpen | FormulaChar+ | braceFormula);
formulaCallItem: alias? formulaic | pattern;
braceFormula: ((assign | greaterThan) ParenOpen) | greaterEqual;
assign: BraceClose BraceClose;
greaterEqual: BraceClose FormulaChar;
greaterThan: BraceClose;

input: Input;
model: Model;
matched: Matched;
caught: Caught;
placeholder: Placeholder;

matcher: ((field | message | number | formulaCall | pattern | nulll ) Assign) | path;

table: (batch tableData) | batch | tableData;
tableData: TableOpen tableRow (RowDivider tableRow)* TableClose;
tableRow: tableField? (Comma tableField)*;
tableField: formulaic;

catch_: BraceOpen formulaic BraceClose;
snatch: TableOpen formulaic watch? TableClose;
watch: Bang;
params: ParenOpen (alias? formulaic)? (Comma alias? formulaic)* ParenClose;
exceptional: matcher ParenOpen snatch? catch_? params? ParenClose;

patchDef: matcher catchType? attach? (batch hatch | batch | hatch) annotation?;
attach: TableOpen (field | type | nulll) TableClose;
catchType: BraceOpen (type | nulll) BraceClose;

batch: ParenOpen batchItem? (Comma batchItem)* ParenClose;
batchItem: type? prot? priv? batchName nullable? mutable? unique? (Assign batchDefault)? annotation?;
batchDefault: formulaic | formula | nulll;
prot: Bang;
priv: Bang;
nullable: Nulll;
mutable: Star;
unique: TableOpen Star TableClose;
batchName: Name;
nulll: Nulll;

hatch: CurlyOpen hatchItem* CurlyClose;
hatchItem: formulaicPiped pipeTerm?;

type: typeFormulaic | typeString | typeBoolean | typeTable |
	(TypeCustom typeName) (ParenOpen formulaCallItem? (Comma formulaCallItem)* ParenClose)?;
typeTable: TypeTable;
typeBoolean: TypeBoolean;
typeString: TypeString;
typeFormulaic: TypeFormulaic;
typeName: Name;

name: Name;
module: Name | type;
parentCall: ParentCall;
field: parentCall* (module Dot)? name;

number: decimalInteger | decimal | hexInteger | octalInteger;
decimalInteger: DecimalInteger;
decimal: Decimal;
hexInteger: HexInteger;
octalInteger: OctalInteger;

message: MESSAGE_OPEN messageContent MESSAGE_CLOSE;
messageContent: MESSAGE_CONTENT;

annotation: ANNOTATION_OPEN annotationContent ANNOTATION_CLOSE;
annotationContent: ANNOTATION_CONTENT;

path: pathOpen pathSection ((pathDirect | pathDig) pathSection)* PATH_Close;
pathSection: pathName | pathField | pathName pathField;
pathOpen: pathRelativeOpen | pathRootOpen | pathParentOpen | pathCurrentOpen;
pathRelativeOpen: PATH_Relative_Open;
pathRootOpen: PATH_Root_Open;
pathParentOpen: PATH_Parent_Open;
pathCurrentOpen: PATH_Current_Open;
pathName: PATH_Name+;
pathDirect: PATH_Dir;
pathDig: PATH_Dig;
pathField: PATH_FieldOpen formulaic? CurlyClose;

pattern: PATTERN_Open (patternPart | patternField)* PATTERN_Close patternModifiers?;
patternModifiers: Name;

patternPart: PATTERN_Part+;
patternField: PATTERN_FieldOpen formulaic? CurlyClose;
