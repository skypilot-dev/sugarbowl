/* Given two arrays, return all elements of the 1st array, in order of appearance, that are
   contained in the 2nd array */
export function getIntersection<T>(
  array1: ReadonlyArray<T>,
  array2: ReadonlyArray<T>,
): T[] {
  return array1.filter(Set.prototype.has, new Set(array2));
}
