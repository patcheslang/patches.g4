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
- **`!` (Yield)**: Pulse a value to the pipeline without stopping.
- **`!!` (Return)**: Commit state changes and exit the Hatch.
- **`!!!` (Abort)**: Rollback changes and terminate the Hatch immediately.

### IV. MATCH (`|/ /|`)
The **Match** is the integrated regex filter.

### V. CATCH / TABLE (`[]`)
The **Table** (or Catch) is the data collection mechanism. When attached to a Batch, it acts as the driver or generator that feeds data into the structural definition. It projects ranges or query results into tabular structures.

---

## 3. The Relational Pipeline

Logic in Patches is driven by **Formulas** and the **Pipeline operator (`|>`)**. Pipelines are state-aware and resolve conditionally.

```ppl
## FizzBuzz as a Relational Literal
(
    i, 
    o: i |> ?(!(%(15)), `fizzbuzz`) 
         |> ?(!(%(5)), `fizz`) 
         |> ?(!(%(3)), `buzz`) 
         |> i
) [ ..(100) ]
```

---

## 4. Sophisticated Literals

### Named Heredocs (The "Universal Host")
For large blocks of unescaped text (SQL, HTML, JSON), use Named Heredocs.
- **Example**: 
  ```ppl
  + /db/query: <<<SQL
    SELECT * FROM users WHERE active = 1;
  SQL>>>;
  ```

### Human-Readable Identifiers
- **Double Quotes (`"`)**: Used for identifiers with spaces. 
- **Example**: `+ ( $"Account Balance": @USD 100.00 );`
- **Flexible Names**: Identifiers like `2girls` are valid, provided they aren't pure numbers.

---

## 5. Implementation Philosophy: SQLite "Training Wheels"
The JavaScript implementation leverages `node:sqlite` to manifest the RDBMS logic implied by the syntax. Patches Paths are sanitized into SQLite Tables, and Batches are processed as SQL Schema or Row data. 
