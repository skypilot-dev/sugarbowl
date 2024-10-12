import type { Integer } from '@skypilot/common-types';

// Return a function that slices an array using the `slice(startAt, stopBefore)`
export function Slice(startAt?: Integer, stopBefore?: Integer) {
  return function slice<T>(items: ReadonlyArray<T>): T[] {
    return items.slice(startAt, stopBefore);
  };
}
