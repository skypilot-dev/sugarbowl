import { describe, expect, it } from 'vitest';

import { setEquality } from '../setEquality.js';

describe('setEquality()', () => {
  it('returns true if the sets are equal', () => {
    const aSet = new Set([1, 2]);
    const bSet = new Set([1, 2]);
    const expectedEquality = true;

    const actualEquality = setEquality(aSet, bSet);

    expect(actualEquality).toBe(expectedEquality);
  });

  it('returns true if both sets are empty', () => {
    const aSet = new Set();
    const bSet = new Set();
    const expectedEquality = true;

    const actualEquality = setEquality(aSet, bSet);

    expect(actualEquality).toBe(expectedEquality);
  });

  it.each([
    [[1], [1, 2]], // different size
    [[1, 2], [3, 4]], // no common elements
    [[], [1, 2]], // one empty set
  ])('returns false if the sets are unequal', (aElements, bElements) => {
    const areEqual = setEquality(new Set(aElements), new Set(bElements));

    expect(areEqual).toBe(false);
  });
});
