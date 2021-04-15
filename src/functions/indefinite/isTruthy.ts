import { Falsy } from '@skypilot/common-types';

export function isTruthy<T>(value: T | Falsy): value is T {
  return Boolean(value);
}
