lexer grammar patchesLexer;

channels { COMMENTS, HASHBANG }

// --- STRUCTURAL ---
Plus: '+';
Pipe: '|>';
Colon: ':';
Comma: ',';
Semicolon: ';';
Dot: '.';
RowDivider: '|';
ParentCall: '\\\\';
LessThan: '<';
GreaterThan: '>';

// --- BLOCKS ---
ParenOpen: '(';
ParenClose: ')';
TableOpen: '[';
TableClose: ']';
CurlyOpen: '{';
CurlyClose: '}';

// --- ATOMS ---
Bang: '!';
Caret: '^';
Question: '?';
Star: '*';

// --- METADATA ---
Input: '%%%%%';
Model: '%%%%';
Matched: '%%%';
Caught: '%%';
Placeholder: '%';

// --- TYPES ---
TypeString: '$';
TypeBoolean: '&';
TypeTable: '#';
TypeFormulaic: '@@';
TypeCustom: '@';

// --- LITERALS ---
HexInteger: '-'? [0] [xX] [0-9a-f_A-F] [0-9a-f_A-F]*;
OctalInteger: '-'? [0] [0-7] [0-7]*;
Decimal: '-'? [0-9]+ ('.' [0-9_]* Exponent? | [0-9_]+ Exponent? | [0-9_] Exponent?)?;
DecimalInteger: '-'? ([0] | [1-9] [1-9_]*);
fragment Exponent: [eE] [+-]? [0-9]+;

// --- IDENTIFIERS ---
Name: ([\p{L}_-] | [\p{N}]+ [\p{L}_-]) [\p{L}\p{N}_-]*;
QuotedName: '"' ~["\r\n]* '"';

// --- WHITESPACE ---
Ws: [\p{White_Space}]+ -> skip;

// --- MODES ---

MESSAGE_OPEN: '<<<'; // Keeping for fallback compatibility
MESSAGE_CLOSE: '>>>';

HEREDOC_OPEN: '<<<' [a-zA-Z_] [a-zA-Z0-9_]* -> pushMode(HEREDOC_MODE);
ANNOTATION_OPEN: '#:' -> pushMode(ANNOTATION);
STRING_OPEN: '`' -> pushMode(STRING_MODE);
PATTERN_Open: '|/' -> pushMode(PATTERN);

PATH_Relative_Open: '//' -> pushMode(PATH);
PATH_Root_Open: '/' -> pushMode(PATH);
PATH_Parent_Open: '../' -> pushMode(PATH);
PATH_Current_Open: './' -> pushMode(PATH);

// --- SYMBOLS (Fallback) ---
FormulaChar: [-~<>@#$%^&*+=\\./?_!]+;

Comment: '##' ~[\r\n]* -> channel(COMMENTS);
HashBang: '#!' ~[\r\n]* -> channel(HASHBANG);

mode ANNOTATION;
ANNOTATION_CONTENT: (':' ~[#] | ~[:])+;
ANNOTATION_CLOSE: ':#' -> popMode;

mode STRING_MODE;
STRING_ESC: '\\`';
STRING_INTERP_OPEN: '{' -> pushMode(DEFAULT_MODE);
STRING_CONTENT: (STRING_ESC | ~[`{])+;
STRING_CLOSE: '`' -> popMode;

mode HEREDOC_MODE;
HEREDOC_CONTENT: ( ~[a-zA-Z0-9_] | [a-zA-Z0-9_]+ ~[>] )+ ;
HEREDOC_CLOSE: [a-zA-Z_] [a-zA-Z0-9_]* '>>>' -> popMode;

mode PATH;
PATH_Name: PATH_Literal+;
PATH_Dig: '//';
PATH_Dir: '/';
PATH_Esc: '\\:';
PATH_FieldOpen: '{' -> pushMode(DEFAULT_MODE);
PATH_Literal: PATH_Esc | ~[/:{} \t\r\n;|()[\],];
PATH_Ws: [ \t\r\n]+ -> skip, popMode;
PATH_Pop: [;|()[\],] -> type(Semicolon), popMode; 
Assign_Pop: ':' -> type(Colon), popMode;
CurlyClose_Pop: '}' -> type(CurlyClose), popMode;

mode PATTERN;
PATTERN_Close: '/|' -> popMode;
PATTERN_FieldOpen: '{' -> pushMode(DEFAULT_MODE);
PATTERN_Part: (PATTERN_Esc | ~[/])+;
PATTERN_Esc: '\\/';
PATTERN_Literal: PATTERN_Esc | ~[/{];
