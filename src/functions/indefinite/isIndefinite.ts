// Return true if the value is `null` or `undefined`
import { isNull } from './isNull';
import { isUndefined } from './isUndefined';

export function isIndefinite(value: Exclude<unknown, null> ): value is undefined;
export function isIndefinite(value: Exclude<unknown, undefined>): value is null;
export function isIndefinite(value: unknown): boolean {
  return isNull(value) || isUndefined(value);
}
