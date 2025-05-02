lexer grammar patchesLexer;

channels { COMMENTS, HASHBANG }

BraceOpen: '<';
BraceClose: '>';

ParenOpen: '(';
ParenClose: ')';

TableOpen: '[';
TableClose: ']';

FormulaChar: ('xy' | [-~<>!@#$%^|&*+=\\./?_]+) ParenOpen;

Input: '%%%%%';
Model: '%%%%';
Matched: '%%%';
Caught: '%%';
Placeholder: '%';
Question: '?';
Star: '*';
Bang: '!';
Caret: '^';
Dot: '.';
Assign: ':';
Comma: ',';
RowDivider: '|';
Semicolon: ';';
ParentCall: '\\\\';

Nulll: '~';
TypeCustom: '@';
TypeFormulaic: '@@';
TypeTable: '#';
TypeBoolean: '&';
TypeString: '$';

HexInteger: '-'? [0] [xX] [0-9a-fA-F] [0-9a-fA-F_]*;
OctalInteger: '-'? [0] [0-7] [0-7]*;
DecimalInteger: '-'? ([0] | [1-9] [1-9_]*);

Decimal: '-'? [0-9]+ ('.' [0-9_]* Exponent? | [0-9_]+ Exponent? | [0-9_] Exponent?)?;

fragment Exponent: [eE] [+-]? [0-9]+;

Name: ([\p{L}_-] [\p{L}\p{N}_-]*) | '"' ~["\r\n\p{Zl}]*  '"';

Ws: [\p{White_Space}] -> skip;

Comment: '##' ~[\r\n\p{Zl}]+ -> channel(COMMENTS);
HashBang: '#!' ~[\r\n\p{Zl}]+ -> channel(HASHBANG);

ANNOTATION_OPEN: '#:' -> pushMode(ANNOTATION);

CurlyOpen: '{' -> pushMode(DEFAULT_MODE);
CurlyClose: '}' -> popMode;

PATH_Relative_Open: '//' -> pushMode(PATH);
PATH_Root_Open: '/' -> pushMode(PATH);
PATH_Parent_Open: '../' -> pushMode(PATH);
PATH_Current_Open: './' -> pushMode(PATH);

PATTERN_Open: '\\' -> pushMode(PATTERN);

MESSAGE_OPEN: '`' -> pushMode(MESSAGE);

mode ANNOTATION;
ANNOTATION_CONTENT: (':' ~[#] | ~[:])+;
ANNOTATION_CLOSE: ':#' -> popMode;

mode PATH;
PATH_Name: PATH_Literal+;
PATH_Dig: '//';
PATH_Dir: '/';
PATH_Esc: '\\:';
PATH_FieldEsc: '\\{';
PATH_FieldOpen: '{' -> pushMode(DEFAULT_MODE);
PATH_Literal: PATH_Esc | PATH_FieldEsc | ~[/:{];
PATH_Close: ':' -> popMode;

mode PATTERN;
PATTERN_Part: PATTERN_Literal+;
PATTERN_Esc: '\'\\';
PATTERN_FieldEsc: '\'{';
PATTERN_FieldOpen: '{' -> pushMode(DEFAULT_MODE);
PATTERN_Literal: PATTERN_Esc | PATTERN_FieldEsc | ~[^{\\];
PATTERN_Close: '\\' -> popMode;

mode MESSAGE;
MESSAGE_ESC: '\\`';
MESSAGE_CONTENT: (MESSAGE_ESC | ~[`])+;
MESSAGE_CLOSE: '`' -> popMode;
