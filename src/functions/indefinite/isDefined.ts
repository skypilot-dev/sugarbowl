import { isUndefined } from './isUndefined';

// Return true if the value is not `undefined`
export function isDefined<T>(value: T | undefined): value is T {
  return !isUndefined(value);
}
