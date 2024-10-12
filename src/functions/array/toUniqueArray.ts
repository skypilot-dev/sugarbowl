/* Given an array, return a new array with all duplicate values removed.
 * For deep-equality comparison, use `toDeepUniqueArray` instead. */

// If ES5 or less is targeted, set `compilerOptions.downLevelIteration: true` in tsconfig.json
export function toUniqueArray<T>(iterable: Iterable<T>): T[] {
  return Array.from(new Set(iterable));
}
