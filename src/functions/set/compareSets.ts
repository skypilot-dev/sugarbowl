import { getObjectEntries } from '~/src/functions/object/TypedObject/getObjectEntries.js';
import { setEquality } from '~/src/functions/set/setEquality.js';
import { setIntersection } from '~/src/functions/set/setIntersection.js';
import { setIsSubset } from '~/src/functions/set/setIsSubset.js';

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
  Array.from(getObjectEntries(setComparisonsDict)),
);

// @ts-expect-error - MapKeys is not defined
export type SetComparisonOperator = MapKeys<typeof setComparisonsMap>;

/**
 * Compares the sets using the comparison operator and returns the boolean result.
 * Source: `skypilot-dev/sugarbowl`
 */
export function compareSets<T>(
  comparisonOperator: SetComparisonOperator,
  aElements: Iterable<T>,
  bElements: Iterable<T> = [],
): boolean {
  const comparisonFn = setComparisonsMap.get(comparisonOperator);
  if (!comparisonFn) {
    throw new Error(`Unsupported comparison operator: ${comparisonOperator}`);
  }
  return comparisonFn(aElements, bElements);
}
