import { isUndefined } from './isUndefined';

export function isDefined(value: unknown): boolean {
  return !isUndefined(value);
}
