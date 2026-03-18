# The Patches Programming Language

Patches is a data-oriented, presumptively parallel language designed for extreme conciseness and LLM-optimized development. It treats the universe of computing as a hierarchy of **Paths**, where every path is an isolated state-tree (Actor). 

---

## 1. The Monolithic Syntax: First-Class Integration

The core innovation of Patches is the integration of several "sublanguages" that are conventionally treated as strings (second-class citizens). In Patches, these are part of the core grammar:

### **I. The Addressing Sublanguage (Paths)**
Conventional: `db.get("/users/1")` (String-based)  
**Patches: `/users/1` (Native Literal)**  
Paths are first-class addresses. The "Dig" operator `//` (recursive search) and interpolation `{}` are native syntactic features, allowing the compiler to validate addresses at build-time.

### **II. The Pattern Sublanguage (Match)**
Conventional: `new RegExp("^[a-z]+")` (String-based)  
**Patches: |/^[a-z]+/| (Native Literal)**  
Regex is not a library; it is a type of "Atomic Formula." You can pipe data directly into a pattern, and you can interpolate Patches logic into the pattern itself.

### **III. The Schema Sublanguage (Batch)**
Conventional: `"CREATE TABLE users (id INTEGER PRIMARY KEY)"` (String-based)  
**Patches: `+ /users: ( &id** );` (Native Structure)**  
Database constraints (`*` unique, `**` primary, `***` incremental) are native sigils. The language collapses the "Object-Relational Mapping" gap by making the data structure and the storage schema syntactically identical.

### **IV. The Reflection Sublanguage (Sigils)**
Conventional: `Object.getPrototypeOf(input)` (API-based)  
**Patches: `%%%%` (Native Sigil)**  
Reflective metadata (the Model `%%%%`, the Input `%%%%%`, the Match result `%%%`) are built-in symbols. This allows for extremely dense, "self-aware" data transformations.

---

## 2. The Five Rhymes: The Stateful Lifecycle

Patches uses a mnemonic lifecycle to manage the complexity of parallel state.

### I. PATCH (`+`)
The **Patch** is the structural anchor. Prefixing a statement with `+` creates or configures a resource at a specific path. 

### II. BATCH (`()`)
The **Batch** is the data payload or schema. 
- **Modifiers**: `!` (Mutable), `^` (Visible), `?` (Nullable).
- **Constraints**: `*` (Unique), `**` (Primary), `***` (Incr).
- **Types**: `$` (String), `&` (Boolean), `#` (Table), `@` (Custom).

### III. HATCH (`{}`)
The **Hatch** is the reactive logic. When data is patched into a path, the Hatch "opens" to execute logic locally on that path.

### IV. MATCH (`|/ /|`)
The **Match** is the integrated regex filter.

### V. SNATCH (`[]`)
The **Snatch** is the retrieval mechanism. It "grabs" data from a path (translates to SQL `SELECT`).

---

## 3. The Imperative Engine: Formulas & Pipes

Logic in Patches is driven by **Formulas** and the **Pipeline operator (`|>`)**.

```ppl
## Stream a string into a transformation and yield the result
`Hello World` |> lower() |> yield();
```

---

## 4. Sophisticated Literals

### Human-Readable Identifiers
- **Double Quotes (`"`)**: Used for identifiers with spaces. 
- **Example**: `+ ( $"Account Balance": @USD 100.00 );`

### Recursive String Interpolation
- **Backticks (`` ` ``)**: Used for strings.
- **Interpolation (`{}`)**: Strings can embed any Patches expression recursively.
- **Example**: `` `Welcome, {$user [ name ]}!` ``

---

## 5. Implementation Philosophy: SQLite "Training Wheels"
The JavaScript implementation leverages `node:sqlite` to manifest the RDBMS logic implied by the syntax. Patches Paths are sanitized into SQLite Tables, and Batches are processed as SQL Schema or Row data. 
