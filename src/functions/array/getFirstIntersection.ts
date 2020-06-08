import { MaybeReadOnlyArray } from '@skypilot/common-types';
import { getIntersection } from './getIntersection';

/* Given two arrays, return the highest-index item of the 1st array that appears in the 2nd array */
export function getFirstIntersection<T>(
  sortedPreferredItems: MaybeReadOnlyArray<T>, referenceItems: MaybeReadOnlyArray<T>
): T | undefined {
  const intersection = getIntersection(sortedPreferredItems, referenceItems);
  return intersection.length ? intersection[0] : undefined;
}
