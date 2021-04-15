import { isNull } from './isNull';
import { isUndefined } from './isUndefined';

// Return true if the value is not `null` or `undefined`
export function isDefinite<T>(value: T | null | undefined): value is T {
  return !(isNull(value) || isUndefined(value));
}
