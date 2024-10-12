/**
 * Returns true if the sets are identical (have the same elements and no others);
 * otherwise, returns false.
 * Source: `skypilot-dev/sugarbowl`
 */
import { setSymmetricDifference } from './setSymmetricDifference.js';

export function setEquality<T>(
  aElements: Iterable<T>,
  bElements: Iterable<T>,
): boolean {
  return setSymmetricDifference(aElements, bElements).size === 0;
}
