import { describe, expect, it } from 'vitest';

import { setSymmetricDifference } from '../setSymmetricDifference.js';

describe('setSymmetricDifference()', () => {
  it('returns elements that are in set A or set B but not both', () => {
    const aSet = new Set([1, 2]);
    const bSet = new Set([2, 3]);
    const expectedDifference = new Set([1, 3]);

    const actualDifference = setSymmetricDifference(aSet, bSet);

    expect(actualDifference).toStrictEqual(expectedDifference);
  });

  it('if the sets are the identical, returns an empty set', () => {
    const aSet = new Set([1, 2]);
    const bSet = new Set([2, 1]);
    const expectedDifference = new Set();

    const actualDifference = setSymmetricDifference(aSet, bSet);

    expect(actualDifference).toStrictEqual(expectedDifference);
  });
});
