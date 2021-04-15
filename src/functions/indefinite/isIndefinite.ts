import { isNull } from './isNull';
import { isUndefined } from './isUndefined';

// Return true if the value is `null` or `undefined`
export function isIndefinite<T>(value: T | null | undefined): value is null | undefined {
  return isNull(value) || isUndefined(value);
}
