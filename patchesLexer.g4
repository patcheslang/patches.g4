lexer grammar patchesLexer;

channels { COMMENTS, HASHBANG }

// Structural
Plus: '+';
Pipe: '|>';
Assign: ':';
Comma: ',';
Semicolon: ';';
ParentCall: '\\\\';

// Blocks
ParenOpen: '(';
ParenClose: ')';
TableOpen: '[';
TableClose: ']';
CurlyOpen: '{';
CurlyClose: '}';

// Modifiers & Constraints
Bang: '!';
Caret: '^';
Question: '?';
Incr: '***';
Primary: '**';
Unique: '*';

// Metadata Sigils
Input: '%%%%%';
Model: '%%%%';
Matched: '%%%';
Caught: '%%';
Placeholder: '%';

// Types
TypeString: '$';
TypeBoolean: '&';
TypeTable: '#';
TypeFormulaic: '@@';
TypeCustom: '@';

// Function Symbols
FormulaChar: ('xy' | [-~<>!@#$%^|&*+=\\./?_]+) ParenOpen;

// Literals
HexInteger: '-'? [0] [xX] [0-9a-f_A-F] [0-9a-f_A-F]*;
OctalInteger: '-'? [0] [0-7] [0-7]*;
DecimalInteger: '-'? ([0] | [1-9] [1-9_]*);
Decimal: '-'? [0-9]+ ('.' [0-9_]* Exponent? | [0-9_]+ Exponent? | [0-9_] Exponent?)?;
fragment Exponent: [eE] [+-]? [0-9]+;

Name: ([\p{L}_-] [\p{L}\p{N}_-]*) | '"' ~["\r\n]*  '"';

Ws: [\p{White_Space}]+ -> skip;
Comment: '##' ~[\r\n]* -> channel(COMMENTS);
HashBang: '#!' ~[\r\n]* -> channel(HASHBANG);

ANNOTATION_OPEN: '#:' -> pushMode(ANNOTATION);
MESSAGE_OPEN: '`' -> pushMode(MESSAGE);
PATTERN_Open: '|/' -> pushMode(PATTERN);

PATH_Relative_Open: '//' -> pushMode(PATH);
PATH_Root_Open: '/' -> pushMode(PATH);
PATH_Parent_Open: '../' -> pushMode(PATH);
PATH_Current_Open: './' -> pushMode(PATH);

mode ANNOTATION;
ANNOTATION_CONTENT: (':' ~[#] | ~[:])+;
ANNOTATION_CLOSE: ':#' -> popMode;

mode MESSAGE;
MESSAGE_ESC: '\\`';
MESSAGE_CONTENT: (MESSAGE_ESC | ~[`])+;
MESSAGE_CLOSE: '`' -> popMode;

mode PATH;
PATH_Name: PATH_Literal+;
PATH_Dig: '//';
PATH_Dir: '/';
PATH_Esc: '\\:';
PATH_FieldOpen: '{' -> pushMode(DEFAULT_MODE);
PATH_Literal: PATH_Esc | ~[/:{}];
Assign_Pop: ':' -> type(Assign), popMode;
CurlyClose_Pop: '}' -> type(CurlyClose), popMode;

mode PATTERN;
PATTERN_Close: '/|' -> popMode;
PATTERN_FieldOpen: '{' -> pushMode(DEFAULT_MODE);
PATTERN_Part: PATTERN_Literal+;
PATTERN_Esc: '\\/';
PATTERN_Literal: PATTERN_Esc | ~[/{];
