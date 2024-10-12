import { describe, expect, it } from 'vitest';

import { setIntersection } from '../setIntersection.js';

describe('setIntersection()', () => {
  it('returns a Set containing the common elements of sets A and B', () => {
    const aSet = new Set([1, 2]);
    const bSet = new Set([2, 3]);
    const expectedIntersection = new Set([2]);

    const actualIntersection = setIntersection(aSet, bSet);

    expect(actualIntersection).toStrictEqual(expectedIntersection);
  });

  it('if there are no common elements, returns the empty set', () => {
    const aSet = new Set([1]);
    const bSet = new Set([2]);
    const expectedIntersection = new Set([]);

    const actualIntersection = setIntersection(aSet, bSet);

    expect(actualIntersection).toStrictEqual(expectedIntersection);
  });

  it('if both sets are empty, returns the empty set', () => {
    expect(
      setIntersection(new Set([]), new Set([]))
    ).toStrictEqual(new Set([]));
  });
});
