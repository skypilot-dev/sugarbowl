import { getSetDifference } from '../set/getSetDifference.js';

export function getArrayDifference<T>(
  minuendArray: Iterable<T>,
  subtrahendArray: T[],
): T[] {
  return Array.from(getSetDifference(minuendArray, subtrahendArray));
}
