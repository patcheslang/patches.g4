# Patches

Patches Programming Language Documentation

## Table of Contents

## 1. What is Patches?

Patches is a table-oriented general programming language for power users,
business intelligence solutions, and rapid application development. It is a
highly opinionated alternative to modern programming with an innovative syntax
and system that promises to solve the "Object-Relational Impedance Mismatch"
problem.

Patches is written in Javascript and runs everywhere Javascript can run. It is
currently in development and doesn't actually work yet. Please stay tuned or, if
so inclined, consider participating in making this bold new approach to
programming a reality.

## 2. Preface

This document serves as the official reference on patches, with the code
examples demonstrated in this guide tested against the syntax and compiler as
it is being written. All of the code examples are numbered, and correspond with
test cases in the syntax (patches.g4) and compiler (patches) repositories.

## 3. Philosophy

Patches is a highly opinionated new programming language with a novel syntax.
There are a handful of principles and ideas at the core of patches: Tabularity,
Progressiveness, Mnemonics, and Integration.

### 3.1. Tabularity

Patches can be described as a dialect of SQL, as every thing is a table. Even
the fields within a table are themselves tables. It's tables all the way down.
Formulas can contain and return tables. On the backend, concurrency and memory
management are handled with a transactional model borrowed from popular
relational databases.

The relational table is the optimal paradigm for visualizing, manipulating, and
solving data-oriented problems. The optimal general programming language is
necessarily table-oriented so that the syntax couples most closely with the
human mind, visual spreadsheet-style interfaces, and hardware, all of which
process data in a tabular and relational paradigm rather than scalar, vector,
tensorial, or arbitrary, amorphous "object" paradigms.

### 3.2. Progressiveness

Just as the English language can be used by toddlers, children, common folks,
and savants to progressively communicate increasingly advanced concepts as one
masters more and more of the language, the ideal programming language is also
"progressive." Patches is designed so that many complex problems can be solved
with formulas and tables alone, never bothering with patches or custom types.

This was inspired by experience with complex spreadsheets designed by power
users in the business environment. I was both impressed with how much they could
achieve and irritated that they were arbitrarily "trapped" by an environment
that required them to break out of the environment entirely and into a very
alien, complex, and separate environment to perform procedural tasks.

Imagine a spreadsheet app where the formula bar elegantly expands into a fully
functional general programming language. That's patches.

### 3.3. Mnemonics

The weakest link in any programming project is ourselves: fallible, forgetful
humans. As such, the most important thing a programming language can do is be
easy to learn and memorize. Patches has an extremely simple syntax and then the
different components of that syntax rhyme or work the same way whenever
possible. Patches are comprised of matches, attaches, catches, batches, and
hatches, for instance.

As the language grows, everything will be stuffed into libraries and services
wherever possible in order to maintain an elegant syntax that a new user can
pick up and run with in a matter of hours.

### 3.4. Integration

Nobody actually programs in general programming languages. General programming
languages are pretty much always clearinghouses between sublanguages, libraries,
and services that one is working with. Whenever possible, the general
programming language works best when it gets out of the way. It's basically just
a glue.

In practice, this means two things. Everything that can be a library or service
instead of a core language feature should be a library or service. More
importantly, a great deal of effort and thought must be put into seamlessly
integrating the general programming language with the universal, standard
sublanguages of modern programming.

To achieve this, patches begins as an exotic dialect of SQL adapted to general
programming. From there, regular expressions, XPath navigation and manipulation
of object models, internationalization, and unix shell patterns and practices
are seamlessly integrated instead of stapled on or substituted.

### 3.5. Web Standards Orientation

While we make several bold decisions, we wish to only make those bold decisions
and no more. Everything that has already been settled by the general community
should be respected instead of relitigated by the patches language.

#### 3.5.1. Do it The WebAssembly Way.

The WebAssembly standard and its related WASI project are working towards a new
set of platform-agnostic approaches and interfaces. The patches project aims to
lean into that and be the WebAssembly-aligned option.

#### 3.5.2. Do it The ECMAScript Way.

ECMAScript is a universal standard for web-oriented programming and (when you
combine Javascript and TypeScript) the most popular programming language.
Because the ability to deploy on the web is imperative, patches is implemented
in "Modern Javascript." As such, wherever possible, the idioms and solutions in
Javascript should be adapted to patches.

In theory, patches could be coded in something that compiles to WebAssembly or
whatever, but it should be designed with as little friction as possible between
itself and the general WebAssembly and Browser Javascript ecosystems.

#### 3.5.3. Do it the Web Way.

There's a whole web of "web standards" that the major browser and network
service vendors have agreed upon. Wherever possible, we should work with rather
than against them.

#### 3.5.4. Do it The Unix Way.

Especially in the configuration of patches programs, Unix idioms and solutions
should be adapted to patches. There must be no special "macro" language or
package management ecosystem in addition to the language, as everything can be
achieved with command line arguments and git.

#### 3.5.5. Don't do it.

A huge problem with modern languages is feature creep. Patches aims to do it
right the first time or not at all. Patches shouldn't support "new" ways of
doing things. If you think patches should do things in a new way that breaks
with the community, then you're invited to fork and rename patches and replace
the language altogether.

## 4. Comments and Conventions

There are four different types of comments in a patches program: line comments,
annotations, hashbang directives, and template tags.

### 4.1. Line comments

There are no multiline comments in patches, as the editing environment is better
suited to handling all of the complex issues that multiline commenting can
raise.

    ## Two hashes begin a line comment.
    SUM(21, 21) ## The answer is 42

### 4.2. Annotations

Annotation comments can be placed immediately after something is defined,
permitting development environments and libraries valuable documentation for
things like hover tips.

They're opened with `#:` and close with `:#` and occur after a definition.

    (tetracontadigon: 42 #: the answer to everything  :#)

### 4.3. Hashbang Directives

Unix shell scripts often have a hashbang line on the first line of scripts,
enabling the shell to figure out how to execute it when it's set to
"executable." Patches embraces and extends this idiom, permitting multiple lines
and handling all configuration issues.

In this version, the (optional) first line is used as normal in the unix
environment, and the second hashbang line loads the (currently imaginary)
standard "office" module that contains the `DATEVALUE` formula.

    #!/usr/bin/env patches
    #! --module "office"

    DATEVALUE(`December 17th, 1920`)

A later chapter is dedicated to the hashbang and related configuration
issues.

### 4.4. Template Tags

Files that aren't patches files can be preprocessed by patches. These files
can't include patch definitions, but can be populated by interpolated formulas.

They're opened with `#>` and close with `<#`.

For example, let's create a `HelloWorld.html.ppl` file:

    #!/usr/bin/env patches
    #! --template text/html
    #! -- module "date"
    <html>
        <head>
            <title>Answer of the day for #>getFullYear()<#</title>
        </head>
        <body>
            The answer for this year is #>*(6, 7)<#.
        </body>
    </html>

There is a later chapter dedicated to fully leveraging patches' template
functionality.

### 4.5. Conventions

All native and standard fields, formulas, and exceptional formulas are in
`UPPERCASE`.

This helps them stand out from user defined formulas and keeps the global
namespace clean. It also is in keeping with the SQL and spreadsheet spirit of
the project. Third party library fields and formulas should stick with
`camelCase`. There are no rules with userland fields and formulas. In fact, the
`"double quotes"` are reserved for naming fields and formulas instead of strings
so that userland projects can present tables with whatever names are most
comfortable for end users.

    (#"Counting Down": ..(10, 1))

## 5. Fields

There are no "variables" in patches, only "fields" in "tables." Don't panic.
It's actually a simpler and easier way to approach things. Trust me.

There are four "types" of types that a field can be: native, custom, primitive,
and special. Native types are a handful of special types that are integrated
into the syntax of the language and are handled specially. Custom types are
types that are created either in a library or by the end user. Primitive types
are a collection of "custom" types that correspond directly with WebAssembly
primitives. Special types are special.

### 5.1. Native Types

All types except the numeric type contain a prefix indicating what the type is.
Native types have a special symbol, while custom, primitive, and special types
begin with a `@` followed by a name or additional symbol (except the "null"
type. The prefix is only necessary when defining a field, and is not used when
referencing it after it has been defined.

| Symbol     | Type              |
|:----------:|-------------------|
|            | Numeric           |
|  `$`       | Message           |
|  `&`       | Boolean           |
|  `#`       | Table             |
|  `@Custom` | A Custom Type     |
|  `~`       | Null / Nothing    |
|  `@@`      | Formulaic / Any   |

#### 5.1.1. The Numeric Type

The numeric type is the only type with no prefix. It is the default type. It
works just like the BigDecimal Java type.

    ~: (a: 0.1, b: 0.2) { info:(<SUM(a, b)>) } ## The answer is 0.3

#### 5.1.2. The Message Type

We call strings of text "messages" in patches because they conform to the ICU
MessageFormat standard and are not necessarily *strings* of text. Double quotes
aren't used for messages. Patches uses backticks for messages because quotes are
very common in messages. The less escaping with backslashes, the better.

    ($"The Hello World Field": `Hello, world!`)

The `$` prefix before the field name indicates that the field is a message.

You can interpolate fields into messages:

    (#things: ..(1, 15), $introduction: `I'm thing {things}!`)

A chapter has been dedicated to MessageFormat Interpolation, explaining
how to internationalize your messages, format your dates and numbers, and more.

#### 5.1.3. The Boolean Type

The `&` prefix before the field name indicates that the field is a boolean
value. There is no "TRUE" or "FALSE" constant, with `1` being canonically true
and `0` being canonically false. Patches will attempt to discern "truthy" and
"falsy" values when they're cast to boolean in a manner similar to the
ECMAScript standard.

    (&isLegal: 1, &isMoral: 0)

#### 5.1.4. The Table Type

The `#` prefix before the field name indicates that the field is a table of
values. Importantly, casting other types to the tabular type will force patches
to break it apart into its constituent parts.

    (#chars: `Each letter is now a row`)

### 5.2. Custom Types

The `@` prefix before the field name indicates that it's a type that's not one
of the native types. These can be standard language types or user defined types.

    (@USD: 42.4242) ## Will round to 42.42, as per the United States Dollar.

Creating your own user defined custom types will be covered in a later chapter.

### 5.3. Primitive Types

Every field in patches is a table. It's tables all the way down. Primitive types
are an exception, as they directly correspond to WebAssembly primitive values.

| Type    | Description             |
|:-------:|-------------------------|
| `@I1 `  | 1 bit unsigned integer  |
| `@I8`   | 8 bit unsigned integer  |
| `@I16`  | 16 bit unsigned integer |
| `@I32`  | 32 bit unsigned integer |
| `@I64`  | 64 bit unsigned integer |
| `@F32`  | 32 bit floating point   |
| `@F64`  | 64 bit floating point   |
| `@V128` | 128 bit SIMD vector     |

### 5.4. Special Types

There are two "special" types: Null (`~`) and Anything (`@@`).

These types are necessary when one wishes to either have no data in a field or
permit any data in a field. The anything (`@@`) type should be used with
caution, of course, as the compiler can't save you from your type errors when
you use that.

## 6. Tables

Tables are comprised of two parts: the batch and the data. Both are optional, as
a batch without a data section can imply a lack of data or imply formulaic data.
A table without a batch can infer the types and leave the field names numeric.

    (#countdown: ..(5, 1)) ## data is formulaic

| countdown |
|-----------|
|     5     |
|     4     |
|     3     |
|     2     |
|     1     |

Tabular columns are divided by commas and tabular rows are divided by pipes.

    [ `five`, 5 | `four`, 4 | `three`, 3 |`two`, 2 | `one`, 1 ]

| 0     | 1 |
|-------|---|
| five  | 5 |
| four  | 4 |
| three | 3 |
| two   | 2 |
| one   | 1 |

## 7. Formulas

Formulas accept zero or more inputs into their "batch" and (usually) return
something. For example, to divide numbers:

    /(1_008, 24) ## 42

You'll notice it's not `1008 / 24`. There are no operators in patches, only
formulas. You can nest formulas:

    *(3, +(7, 7)) ## 42

You can also pipe formulas, because nesting can get overwhelming pretty quick:

    +(7, 7), *(3, %) ## 42

The placeholder (`%`) contains whatever was passed from the left. With many
formulas, you can imply the placeholder:

    +(7, 7), *(3) ## 42

You can define your own formulas within batches:

    (countdown: ..(5, 1), !!double(n): { *(2) }, doubled: double(countdown))

The exclamation marks before the formula mark that batch item as protected and
private, meaning that it won't be visible in the table emitted:

| countdown | doubled |
|-----------|---------|
|     5     |   10    |
|     4     |    8    |
|     3     |    6    |
|     2     |    4    |
|     1     |    2    |

## 8. Formulaic Tables

Formulaic tables have already been demonstrated in several previous examples.
You can mix up data and formulas in tables for a spreadsheet-style experience.

The modulo formula for discerning if a number is a multiple is: `MOD()`.

(n, $shout: IF(MOD(n, 3), `fizz`, n)) [1|2|3|4|5|6|7]

| n | shout |
|---|-------|
| 1 |   1   |
| 2 |   1   |
| 3 | fizz  |
| 4 |   1   |
| 5 |   1   |
| 6 | fizz  |
| 7 |   1   |

In addition to formulaic tables, there are also tabular formulas, like the
`..(first, final)` formula we've been using to generate sequential tables of
numbers. A wide range of power user and business problems can be solved without
using anything more than the standard formulas in conjunction with formulaic
tables and/or tabular formulas.

## 9. Exceptional Formulas

While standard formulas pass information by value into them and pass information
by value back out of them, exceptional formulas can "throw" a field "by
reference," meaning that it can be manipulated. Exceptional formulas are the
exception to the otherwise "functional" nature of patches, permitting mutation,
side effects, and procedural behavior.

The syntax for exceptional formulas is as follows, with most of it optional:

    MATCH:(<CATCH> [SNATCH] (BATCH))

Match: This is the label of the patch that will match and catch the formula.

Catch: This is the field that's thrown by reference and returned, becoming the
"caught" field.

Snatch: If this is included, with a tabular field, then the patch that matches
the formula will iteratively evaluate once for every row of the table. The table
is passed by reference and can be modified if it's writable.

Batch: These are additional fields passed by value to the patch, if necessary.

Here's a very simple exceptional formula that emits information to INFO,
analogous to `console.info()` in Javascript:

    INFO:((`Hello, world!`)) ## Hello, world!

## 10. Patches

Patches are what patches is all about. They're what catch exceptional formulas.
They can only be defined at the base of the program, and patches can't be
defined within other patches or batches.

    MATCH: <CATCH> [ATTACH] (BATCH) {HATCH}

Match: This is the label that matches the exceptional formula.

Catch: You enter a "type" here, indicating the type of the field the patch can
catch.

Attach: You can enter another patch or type here, which attaches the patch as
a child to that parent, inheriting all of its formulas and fields that can be
overriden.

Batch: You can define all of the fields and formulas in the patch within the
batch and define defaults and constraints for the incoming batch fields.

Hatch: This contains a list of formulas to be executed sequentially when the
patch is evaluated.

The `~` patch is special, in that it's automatically evaluated when the program
is evaluated, and its fields and formulas exist in the global namespace of that
file.

    ~: ($item: `fish`) { Thank:((gift: item)) }

    ## Thanks for all the fish!
    Thank: <$> ($gift) { `Thanks for all the {gift}!`! }

## 11. Matches

In the previous examples, only label matches have been demonstrated. The
matching functionality also includes field, formulaic, pattern, and xpath
matches.

### 11.1. Label Matches

Label matches behave similarly to function names in conventional programming
languages. If the label matches and there's no conflict in the types being sent,
then the exceptional formula that's thrown will be caught and evaluated by the
matching patch.

### 11.2. Field Matches

Field matches work by matching value.

    ~: { 42:(<`Matched!`>) }
    41: { INFO:(<%>) }
    42: { INFO:(<%>) }
    43: { INFO:(<%>) }

Only the patch named "42" will match, catch, and evaluate the thrown formula.

### 11.3. Formulaic Matches

Formulaic matches match and catch when they evaluate to equal.

    ~: <$> { ..(1, 15):(<%>)! }
    MOD(3): { `fizz`! }
    MOD(5): { `buzz`! }
    NOT(MOD(3), MOD(5)): { %! }

### 11.4. Pattern Matches

Pattern matches work with regular expressions.

    ~: <$> { dinosaur:(<`SUCCESS`>)! }
    \saur\: { %! }

### 11.5. XPath Matches

XPath matches work with object models, which are explained in a following
chapter.

    /html/body/footer: { ./span[copyright]:(<2022>) }

## 12. Attaches

Whenever you include a patch or type in the "attaches," that patch or type
becomes the parent. If you need to reach behind the current patch for a field or
formula, use the double backslash syntax: `\\field` to access it.

## 13. Catches

The catch part of the patch is for defining the type of the field to be caught.
The caught field is both the first placeholder (`%`) as well as the caught
(`%%`) placeholder. The caught variable is returned at the end of the hatch
unless the caught variable is replaced with null (`~`) or the patch is iterating
a snatch, in which case the caught field isn't returned to the calling
exceptional formula until the last row of the snatch has been iterated.

## 14. Batches

The batch appears in tables, in formulas, in exceptional formulas, and in patch
definitions. The syntax is the same, though some batch functionality only makes
sense in certain contexts. For example, you can define a field as unique,
which constrains the table so that every field in that row is distinct. This
makes no sense in cases where the batch isn't defining something with multiple
rows.

### 14.1. Definition

The batch in a formula call is parameters. You can explicitly name parameters in
patches, and doing so is encouraged when it improves readability. Patches will
attempt to guess which parameters go to which fields in the batch being called
by a process of elimination. Everything passed to a patch is passed by value,
with any mutations made to the data being ephemeral, existing and disappearing
within the called context.

### 14.2. Protected

When a batch definition is "protected," it can't be written to by the outside
context.

    (!pos, !neg: *(pos, -1)) [1|2|3|4|5]

| pos | neg |
|-----|-----|
|  1  | -1  |
|  2  | -2  |
|  3  | -3  |
|  4  | -4  |
|  5  | -5  |

This table is read-only.

### 14.3. Private

When a batch definition is "private," it's invisible to the outside context.

    (!!pos: ..(1, 5), !neg: *(pos, -1))

| neg |
|-----|
| -1  |
| -2  |
| -3  |
| -4  |
| -5  |

The "pos" column is hidden inside the table.

### 14.4. Nullable

When a batch definition is "nullable," it can be left null. By default, fields
cannot be null, meaning that it must either be defined or, in the case of
formulas and patches, the value is a required parameter.

In this case, the doubleMe field does not contain a default definition, so the
only way this program will execute is if the value is defined in the
configuration.

    ~: (doubleMe) { *(2) }

In this case, we allow the null, but throw an error message at the user.

    ~: (doubleMe~) {
        IF(NULL(doubleMe), ERROR:(<`No value to double!`>), *(2, doubleMe))
    }

### 14.5. Mutable

While "protected" determines whether a value can be mutated from outside the
context, "mutable" determines whether a value can be mutated from within the
context, within the hatch. By default, fields are immutable.

    ~: (answer*: 41) {
        INFO:(<`before: {answer}`>) ## 41
        SET:(<answer> (42))
        INFO:(<`after: {answer}`>) ## 42
    }

### 14.6. Unique

This table is constrainted with the "unique" constraint (`[*]`) to disallow
multiple employees sharing an employee id.

    (EmployeeId[*], $name) [1234, `Doe, John` | 1235, `Doe, Jane` ]

## 15. Hatches

The hatch is the part of the patch where formulas and exceptional formulas are
evaluated in procedural sequence.

Unless instructed otherwise, the hatch will return the caught field. There are
three ways to modify that behavior:

### 15.1. Assignment

You can use the `SET:` exceptional formula to update fields. If no field is
named in the catch, then the caught field (`%%`) within the current hatch is
what's changed.

### 15.2. Exit

You can use the `EXIT:` exceptional formula in one of three ways:

    :~ {
        EXIT:() ## immediately exits, returning the caught field
        EXIT:(<~>) ## immediately exits, returning nothing (null)
        EXIT:(<42>) ## immediately exits, replacing the field with "42"
    }

### 15.3. Fork

The `FORK:` exceptional formula works exactly like `EXIT:`, except execution is
forked, both returning the caught field to the calling exceptional formula and
continuing to evaluate subsequent formulas. Attempts to modify or return the
caught field after a fork will result in an error.

## 16. Snatches

The snatch is the primary mechanism for iteration in patches. When a tabular
field is passed in the snatch of the exceptional formula, the catching patch's
hatch is evaluated iteratively, once for each row of the snatched table.

## 17. Defining Custom Types

## 18. Equality

## 19. Object Models

## 20. Hashbang Directives

## 21. Modules

## 22. Services

## 23. Templates

## 24. MessageFormat Interpolation

## 25. Examples
