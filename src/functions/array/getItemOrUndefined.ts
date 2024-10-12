import type { Integer } from '@skypilot/common-types';

/**
 * Returns a function that accepts a relative index and returns that element from the array if the
 * element exists, or undefined if the array does not contain the desired element or does not exist.
 */
export function getItemOrUndefined<T>(items: T[] | undefined) {
  return function getItemByRelativeIndex(relIndex: Integer): T | undefined {
    if (!items?.length) {
      return undefined;
    }
    const index = relIndex < 0 ? items.length - Math.abs(relIndex) : relIndex;
    return items.length > relIndex ? items[index] : undefined;
  };
}

/**
 * Convenience functions that returns the first or last item in an array, or `undefined` if the
 * array is empty or undefined.
 */
export function firstItem<T>(items: T[] | undefined): T | undefined {
  return getItemOrUndefined(items)(0);
}

export function lastItem<T>(items: T[] | undefined): T | undefined {
  return getItemOrUndefined(items)(-1);
}
