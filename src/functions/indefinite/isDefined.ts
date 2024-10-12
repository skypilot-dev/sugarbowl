// Return true if the value is not `undefined`
export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function assertIsDefined<T>(value: T | undefined): asserts value is T {
  if (value === undefined) {
    throw new Error('Expected value to be defined');
  }
}
