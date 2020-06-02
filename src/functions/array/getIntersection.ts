import { MaybeReadOnlyArray } from '@skypilot/common-types';

export function getIntersection<T>(
  array1: MaybeReadOnlyArray<T>, array2: MaybeReadOnlyArray<T>
): T[] {
  return array1.filter(Set.prototype.has, new Set(array2));
}
