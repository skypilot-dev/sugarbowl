// Source: `skypilot-dev/sugarbowl`
import { isNullable } from './isNullable.js';

export function assertIsNonNullable<T>(value: T | undefined | null): asserts value is T {
  if (isNullable(value)) {
    throw new Error('Expected value to be non-nullable');
  }
}
