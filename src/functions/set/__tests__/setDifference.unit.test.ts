import { describe, expect, it } from 'vitest';

import { setDifference } from '../setDifference.js';

describe('setDifference(iterable1, iterable2)', () => {
  it('returns set 1 when the two iterables have no elements in common', () => {
    const set1 = new Set([1, 2]);
    const set2 = new Set([3, 4]);

    const difference = setDifference(set1, set2);

    expect(difference).toStrictEqual(set1);
  });

  it('returns an empty set when iterable 1 is a subset of iterable 2', () => {
    const set1 = new Set([1, 2]);
    const set2 = new Set([1, 2, 3]);
    const expectedDifference = new Set([]);

    const difference = setDifference(set1, set2);

    expect(difference).toStrictEqual(expectedDifference);
  });

  it('returns the elements exclusive to iterable 1 when the iterables intersect', () => {
    const set1 = new Set([1, 2]);
    const set2 = new Set([2, 3]);
    const expectedDifference = new Set([1]);

    const difference = setDifference(set1, set2);

    expect(difference).toStrictEqual(expectedDifference);
  });
});
