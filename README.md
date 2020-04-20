# @skypilot/sugarbowl

[![npm stable](https://img.shields.io/npm/v/@skypilot/sugarbowl?label=stable)](https://www.npmjs.com/package/@skypilot/sugarbowl)
![stable build](https://img.shields.io/github/workflow/status/skypilot-dev/sugarbowl/Stable%20release?label=stable%20build)
[![npm next](https://img.shields.io/npm/v/@skypilot/sugarbowl/next?label=next)](https://www.npmjs.com/package/@skypilot/sugarbowl)
![next build](https://img.shields.io/github/workflow/status/skypilot-dev/sugarbowl/Prerelease?branch=next&label=next%20build)
![Codacy grade](https://img.shields.io/codacy/grade/218540d35b43406f802719cd8af93a10)
![downloads](https://img.shields.io/npm/dm/@skypilot/sugarbowl)
[![license: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A collection of typed convenience functions for JavaScript & TypeScript.

All functions are typed, and it is expected that they will be used only in
type-checked code. This keeps the functions lightweight: they do not
carry the overhead of checking argument types or handling type coercion.

## Exports

### Array functions

-   `flatten`
-   `omitSequentialDuplicateItems`
-   `pickRandomItems`
-   `shuffle`
-   `toUniqueArray`

### Date & time functions

-   `isValidDate`
-   `sleep`

### Filesystem functions

-   `findPackageFileDir`
-   `findUpTree`
-   `readPackageFile`
-   `writePackageFile`

### Higher-order functions

-   `curry(fnToCurry: Function, ...args: any[]): Function`
-   `extendFunction(fnToExtend: Function, ...extendingFns: Function[]): Function`
-   `toMapFunction(...itemFns: Function[]): Function`

### Number functions

-   `isInteger(value: any): boolean`

### Object functions

-   `getOrDefault(obj: object, key: string, default: any)`
-   `isObject(value: any): boolean`
-   `omitFalsyEntries(obj: object): object`
-   `omitUndefinedEntries(obj: object): object`
-   `swapKeysAndValues(obj: object): object`

### String functions

-   `capitalizeAllWords(stringToCapitalize: string): string</code>`
-   `<code>capitalizeFirstWord(stringToCapitalize: string): string`
-   `computeHash(stringToHash: string, length: Integer = 32): string`
-   `countOccurrences(str: string, substring: string): Integer`
-   `digitsOnly(stringToParse: string): string`
-   `inflectByNumber(howMany: number, singular: string, plural?: string): string`
-   `inflectQuantity(howMany: number, singular: string, plural?: string): string`
-   `isEnclosed(stringToCheck: string, startDelimiter: string, endDelimiter?: string = startDelimiter): boolean`
-   `nondigitsOnly(stringToParse: string): string`
-   `function parseEnclosed(stringToParse: string, startDelimiter: string, endDelimiter: string = startDelimiter): string`
-   `removeExtraWhitespace(str: string): string`
-   `removeWhitespace(str: string): string`
-   `splitOnce(stringToSplit: string, splitter: string>): string[]`
-   `startsWith(string: string, substring: string, startFromPosition: Integer = 0): boolean`

### `String.prototype` wrappers

-   `padEnd`
-   `padStart`
-   `toLowerCase`
-   `toUpperCase`
-   `trim`
-   `trimLeft`
-   `trimRight`
