import type { MockInstance} from 'vitest';
import { describe, expect, it, vi } from 'vitest';

import type { SetComparisonOperator } from '~/src/functions/set/compareSets.js';
import { compareSets } from '~/src/functions/set/compareSets.js';
import * as SetEqualityMod from '~/src/functions/set/setEquality.js';
import * as SetIntersectionMod from '~/src/functions/set/setIntersection.js';
import * as SetIsSubsetMod from '~/src/functions/set/setIsSubset.js';

describe('compareSets()', () => {
  const spyOnSetEquality = vi.spyOn(SetEqualityMod, 'setEquality');
  const spyOnSetIntersection = vi.spyOn(SetIntersectionMod, 'setIntersection');
  const spyOnSetIsSubset = vi.spyOn(SetIsSubsetMod, 'setIsSubset');

  it.each([
    ['SET_EQ', spyOnSetEquality, true],
    ['SET_NE', spyOnSetEquality, false],
    ['SET_SUB', spyOnSetIsSubset, true],
    ['SET_NOT_SUB', spyOnSetIsSubset, false],
    ['SET_DISJOINT', spyOnSetIntersection, true],
    ['SET_INTERSECTS', spyOnSetIntersection, false],
  ] as const)('when set operator is %s', (operator: SetComparisonOperator, spy: MockInstance, expected: boolean) => {
    vi.clearAllMocks();
    const aElements: never[] = [];
    const bElements: never[] = [];

    const actual = compareSets(operator, aElements, bElements);

    expect(actual).toBe(expected);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(aElements, bElements);
  });

  it.each([
    ['SET_EQ', spyOnSetEquality, false],
    ['SET_NE', spyOnSetEquality, true],
    ['SET_SUB', spyOnSetIsSubset, true],
    ['SET_NOT_SUB', spyOnSetIsSubset, false],
    ['SET_DISJOINT', spyOnSetIntersection, false],
    ['SET_INTERSECTS', spyOnSetIntersection, true],
  ] as const)('when set operator is %s', (operator: SetComparisonOperator, spy: MockInstance, expected: boolean) => {
    vi.clearAllMocks();
    const aElements = [1];
    const bElements = [1, 2];

    const actual = compareSets(operator, aElements, bElements);

    expect(actual).toBe(expected);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(aElements, bElements);
  });

  it('if comparison operator does not exist, throws an error', () => {
    const badOperator = 'NOT_AN_OPERATOR' as const;
    expect(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      () => compareSets(badOperator as any, [], [])
    ).toThrow('Unsupported comparison operator');
  });
});
