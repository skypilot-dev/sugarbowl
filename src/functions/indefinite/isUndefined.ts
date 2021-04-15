// Return true if the value is undefined
export function isUndefined<T>(value: T | undefined): value is undefined {
  return typeof value === 'undefined';
}
