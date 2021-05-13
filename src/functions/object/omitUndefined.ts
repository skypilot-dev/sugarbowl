/*
  TODO: Improve the return type so that undefined values are excluded
  TODO: Optionally, recursively omit nested entries with undefined values.
 */

import { omitByValue } from './omitByValue';

/**
 * @description Remove keys whose values have the given value and return as a new object
 */
export function omitUndefined<T extends Record<string, V>, V>(obj: T): Partial<T> {
  return omitByValue(undefined, obj);
}
