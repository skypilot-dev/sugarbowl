/**
 * Returns the symmetric difference of the two sets.
 * Source: `skypilot-dev/sugarbowl`
 */
import { setDifference } from './setDifference.js';

export function setSymmetricDifference<T>(
  aElements: Iterable<T>, bElements: Iterable<T>
): Set<T> {
  return new Set([...setDifference(aElements, bElements), ...setDifference(bElements, aElements)]);
}
