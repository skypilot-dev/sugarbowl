import { describe, expect, it } from 'vitest';

import { setIsSubset } from '../setIsSubset.js';

describe('setIsSubset()', () => {
  it('returns true all elements in set A are in set B', () => {
    const aSet = new Set([1, 2]);
    const bSet = new Set([3, 2, 1]);
    const expectedEquality = true;

    const actualEquality = setIsSubset(aSet, bSet);

    expect(actualEquality).toBe(expectedEquality);
  });

  it('returns true if the sets are identical', () => {
    const aSet = new Set(['']);
    const bSet = new Set(['']);
    const expectedEquality = true;

    const actualEquality = setIsSubset(aSet, bSet);

    expect(actualEquality).toBe(expectedEquality);
  });

  it('returns true if set A is empty', () => {
    const aSet = new Set();
    const bSet = new Set([1]);
    const expectedEquality = true;

    const actualEquality = setIsSubset(aSet, bSet);

    expect(actualEquality).toBe(expectedEquality);
  });

  it('returns true if both sets are empty', () => {
    const aSet = new Set();
    const bSet = new Set();
    const expectedEquality = true;

    const actualEquality = setIsSubset(aSet, bSet);

    expect(actualEquality).toBe(expectedEquality);
  });

  it('returns false if set B is empty and set A is not', () => {
    const aSet = new Set([0]);
    const bSet = new Set();

    const expectedEquality = false;

    const actualEquality = setIsSubset(aSet, bSet);

    expect(actualEquality).toBe(expectedEquality);
  });
});
