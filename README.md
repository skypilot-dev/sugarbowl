# @skypilot/sugarbowl
A collection of typed convenience functions for JavaScript & TypeScript.

All functions are typed, and it is expected that they will be used only in
type-checked code. This keeps the functions lightweight: they do not
carry the overhead of checking argument types or handling type coercion.

__Array functions__

- `flatten`
- `pickRandomItems`
- `shuffle`
- `toUniqueArray`

__Date functions__

- `isValidDate`

__String functions__
- `capitalizeAllWords`
- `capitalizeFirstWord`
- `digitsOnly`
- `inflectByNumber`
- `inflectQuantity`
- `nondigitsOnly`
- `removeExtraWhitespace`
- `removeWhitespace`
- `startsWith`

__`String.prototype` wrappers__
- `padEnd`
- `padStart`
- `toLowerCase`
- `toUpperCase`
- `trim`
- `trimLeft`
- `trimRight`
