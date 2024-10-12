import { isNull } from '~/src/functions/indefinite/isNull.js';
import { isUndefined } from '~/src/functions/indefinite/isUndefined.js';

// Return true if the value is not `null` or `undefined`
export function isDefinite<T>(value: T | null | undefined): value is T {
  return !(isNull(value) || isUndefined(value));
}
