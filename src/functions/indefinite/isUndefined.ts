// Return true if the value is undefined
export function isUndefined<T>(value: T | undefined): value is undefined {
  return value === undefined;
}

export function assertIsUndefined<T>(value: T | undefined): asserts value is undefined {
  if (value !== undefined) {
    throw new Error('Expected value to be undefined');
  }
}
