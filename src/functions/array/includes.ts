import { Integer } from '@skypilot/common-types';

// Type-safe version of `Array.prototype.includes`
export function includes<T, U extends T>(
  array: ReadonlyArray<U>,
  searchElement: T,
  fromIndex?: Integer
): searchElement is U {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  return array.includes(searchElement as any, fromIndex);
}
