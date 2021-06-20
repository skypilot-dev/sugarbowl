/* Given two arrays, return all elements of the 1st array, in order of appearance, that are
   not contained in the 2nd array */
export function getDifference<T>(
  array1: ReadonlyArray<T>, array2: ReadonlyArray<T>
): T[] {
  return array1.filter(value => !array2.includes(value));
}
