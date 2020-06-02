import { MaybeReadOnlyArray } from '@skypilot/common-types';
import { getIntersection } from './getIntersection';

export function getFirstIntersection<T>(
  sortedPreferredItems: MaybeReadOnlyArray<T>, referenceItems: MaybeReadOnlyArray<T>
): T | undefined {
  const intersection = getIntersection(sortedPreferredItems, referenceItems);
  return intersection.length ? intersection[0] : undefined;
}
