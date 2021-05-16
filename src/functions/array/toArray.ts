export function toArray<T>(value: T | ReadonlyArray<T>): Array<T> {
  if (value instanceof Array) {
    return [...value];
  }
  return [value];
}
