import { getObjectEntries } from '../utils/getObjectEntries.js';
import { setEquality } from '../utils/setEquality.js';
import { setIntersection } from '../utils/setIntersection.js';
import { setIsSubset } from '../utils/setIsSubset.js';
import type { MapKeys } from '../utils/utils.types.js';

const setComparisonsDict = {
  SET_EQ: <T>(a: Iterable<T>, b: Iterable<T>) => setEquality<T>(a, b),
  SET_NE: <T>(a: Iterable<T>, b: Iterable<T>) => !setEquality<T>(a, b),

  SET_SUB: <T>(a: Iterable<T>, b: Iterable<T>) => setIsSubset(a, b),
  SET_NOT_SUB: <T>(a: Iterable<T>, b: Iterable<T>) => !setIsSubset(a, b),

  SET_DISJOINT: <T>(a: Iterable<T>, b: Iterable<T>) => setIntersection<T>(a, b).size === 0,
  SET_INTERSECTS: <T>(a: Iterable<T>, b: Iterable<T>) => setIntersection<T>(a, b).size > 0,

  // Candidates for inclusion: SET_SIZE_EQ, SET_SIZE_NE, SET_SIZE_LT, SET_SIZE_GT, SET_SIZE_LTE, SET_SIZE_GTE
} as const;

const setComparisonsMap = new Map(
  Array.from(getObjectEntries(setComparisonsDict))
);

export type SetComparisonOperator = MapKeys<typeof setComparisonsMap>;

/**
 * Compares the sets using the comparison operator and returns the boolean result.
 * Source: `skypilot-dev/sugarbowl`
 */
export function compareSets<T>(
  comparisonOperator: SetComparisonOperator,
  aElements: Iterable<T>,
  bElements: Iterable<T> = []
): boolean {
  const comparisonFn = setComparisonsMap.get(comparisonOperator);
  if (!comparisonFn) {
    throw new Error(`Unsupported comparison operator: ${comparisonOperator}`);
  }
  return comparisonFn(aElements, bElements);
}
