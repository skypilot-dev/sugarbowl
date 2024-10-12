import { getIntersection } from '~/src/functions/array/getIntersection.js';

/* Given two arrays, return the highest-index item of the 1st array that appears in the 2nd array */
export function getFirstIntersection<T>(
  sortedPreferredItems: ReadonlyArray<T>, referenceItems: ReadonlyArray<T>
): T | undefined {
  const intersection = getIntersection(sortedPreferredItems, referenceItems);
  return intersection.length ? intersection[0] : undefined;
}
