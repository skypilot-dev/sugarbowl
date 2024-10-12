import { isNull } from './isNull.js';
import { isUndefined } from './isUndefined.js';

// Return true if the value is not `undefined`
export function isNullable<T>(value: T | null | undefined): value is null | undefined {
  return isNull(value) || isUndefined(value);
}
