import { isNull } from './isNull.js';
import { isUndefined } from './isUndefined.js';

// Return true if the value is not `undefined`
export function isNonNullable<T>(value: T | null | undefined): value is T {
  return !isNull(value) && !isUndefined(value);
}
