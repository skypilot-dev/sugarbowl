/* -- IMPLEMENTATION -- */
export function toArray<T>(value: T | T[]): T[] {
  return value instanceof Array
    ? value
    : [value];
}
