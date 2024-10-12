import type { Integer } from '@skypilot/common-types';

/* TODO: Support a `step` option. */

/* Adapted from https://dev.to/ycmjason/how-to-create-range-in-javascript-539i */
export function range(start: Integer, end: Integer): Integer[] {
  if (start > end) {
    return [];
  }
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}
