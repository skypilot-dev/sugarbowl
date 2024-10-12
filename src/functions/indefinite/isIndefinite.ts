import { isNull } from '~/src/functions/indefinite/isNull.js';
import { isUndefined } from '~/src/functions/indefinite/isUndefined.js';

// Return true if the value is `null` or `undefined`
export function isIndefinite<T>(value: T | null | undefined): value is null | undefined {
  return isNull(value) || isUndefined(value);
}
