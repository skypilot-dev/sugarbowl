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

- `flatten`
- `getDuplicates`
- `getFirstIntersection`
- `getIntersection`
- `getLastItem`
- `includeIf`
- `includes`
- `omitSequentialDuplicateItems<I>(array: I[], { evaluate? }): I[]`
- `pagesToIndices`
- `pickRandomItem`
- `pickRandomItems`
- `pushIf`
- `range(start: Integer, end: Integer): Integer[]`
- `shuffle`
- `resolveSlice(startAt: Integer | undefined, stopBefore: Integer | undefined): [Integer, Integer]`
- `toArray<T>(T | T[]): T[]`
- `toUniqueArray`

#### Array-function factories

- `Slice(startAt?: Integer, stopBefore?: Integer)`

### Date & time functions

- `isValidDate`
- `makeDateTimeStamp`
- `sleep`
- `slugifyDateTime`
- `toUnixTime(:Date, decimalPlaces?: Integer): number`
- `toUnixTime(timestampInMs: number, decimalPlaces?: Integer): number`
- `truncateIsoDateTime`

### Filesystem functions

- `checkIsChildPath(targetPath: string | string[], referencePath: string | string[]): boolean`
- `checkIsInBoundary(targetPath: string | string[], boundaryPath: string | string[], scope): boolean`
- `composeFileName`
- `deleteFile` **Replaced by `deleteFileSync` in v4.0.0**
- `deleteFileSync`
- `findPackageFileDir`
- `findUpTree`
- `getFileSystemRoot`
- `listFilesSync`
- `makeTempDir`
- `readPackageFile` **Replaced by `readPackageFileSync` in v4.0.0**
- `readPackageFileSync`
- `safeWipe`
- `safeWipeSync`
- `toPath(pathLike: string | string[]): string`
- `wipeDir` **Removed in v4.0.0**
- `writeDataFile`
- `writePackageFile` **Replaced by `writePackageFileSync` in v4.0.0**
- `writePackageFileSync`

### Higher-order functions

- `curry(fnToCurry: Function, ...args: any[]): Function`
- `extendFunction(fnToExtend: Function, ...extendingFns: Function[]): Function`
- `pipe(...fnsToPipe: Function[])`
- `toMapFunction(...itemFns: Function[]): Function`

### Truthy/falsy/defined functions

- `isDefinite(value: T | null | undefined): value is T`
- `isIndefinite(value: unknown): value is null | undefined`
- `isNull(value: unknown): value is null`
- `isTruthy(value: T | Falsy): value is T`
- `isUndefined(value: unknown): value is undefined`

### Input/output functions

- `consoleIf(:boolean): (message: string) => void`

### Number functions

- `generateRandomInt(minValue: number, maxValue: number): Integer`
- `isInteger(value: any): boolean`
- `isNumeric(value: any): boolean`

### Object functions

- `entriesToKeyedItems(key: string, obj: object)`
- `filterLeavesByKey(key: string, obj: object, options)`
- `getOrDefault(obj: object, key: string, default: any)`
- `isObject(value: any): boolean`
- `mergeIf(conditional: any, :object)`
- `omitByValue<TValues, TValue extends TValues>(value: TValue, obj: Record<string, TValues>): Record<string, TValues>`
- `omitEmpty<TValues>(obj: Record<string, TValues>): Record<string, Exclude<TValues, {} | []>>`
- `omitEmptyArrays<TValues>(obj: Record<string, TValues>): Record<string, Exclude<TValues, []>>`
- `omitEmptyObjects<TValues>(obj: Record<string, TValues>): Record<string, Exclude<TValues, {}>>`
- `omitEntriesByValue(value: any, obj: object): object` **deprecated; use `omitByValue`**
- `omitFalsy<TValues>(obj: Record<string, TValues>): Record<string, Exclude<TValues, null | undefined | '' | 0>'>`
- `omitFalsyEntries(obj: object): object` **deprecated; use `omitFalsy`**
- `omitIndefinite<TValues>(obj: Record<string, TValues>): Record<string, Exclude<TValues, null | undefined>`
- `omitNulls<TValues>(obj: Record<string, TValues>): Record<string, Exclude<TValues, null>`
- `omitUndefined<TValues>(obj: Record<string, TValues>): Record<string, Exclude<TValues, undefined>`
- `omitUndefinedEntries(obj: object): object` **deprecated; use `omitUndefined`**
- `setValueByPath(path: string | string[], value: any, target: object, options?)`
- `swapKeysAndValues(obj: object): object`
- `TypedObject.entries(obj: object | Array | number | string): [key: string, value][]`
- `TypedObject.keys(obj: object | Array | number | string): string[]`

### String functions

- `capitalizeAllWords(stringToCapitalize: string): string`
- `<code>capitalizeFirstWord(stringToCapitalize: string): string`
- `computeHash(stringToHash: string, length: Integer = 32): string`
- `countOccurrences(str: string, substring: string): Integer`
- `digitsOnly(stringToParse: string): string`
- `inflectByNumber(howMany: number, singular: string, plural?: string): string`
- `inflectQuantity(howMany: number, singular: string, plural?: string): string`
- `isEnclosed(stringToCheck: string, startDelimiter: string, endDelimiter?: string = startDelimiter): boolean`
- `nondigitsOnly(stringToParse: string): string`
- `parseInteger(stringToParse: string, options): Integer`
- `parseEnclosed(stringToParse: string, startDelimiter: string, endDelimiter: string = startDelimiter): string`
- `randomAlphanumeric(length: Integer): string`
- `removeExtraWhitespace(str: string): string`
- `removeWhitespace(str: string): string`
- `splitOnce(stringToSplit: string, splitter: string>): string[]`
- `startsWith(string: string, substring: string, startFromPosition: Integer = 0): boolean`

### `String.prototype` wrappers

- `padEnd`
- `padStart`
- `toLowerCase`
- `toUpperCase`
- `trim`
- `trimLeft`
- `trimRight`

### Test helpers

- `makeTestDir`
- `makeTestRunDir`
- `makeTestsDir`

### Classes

- `Directory`
- `EventLog`
- `StringCounter`
