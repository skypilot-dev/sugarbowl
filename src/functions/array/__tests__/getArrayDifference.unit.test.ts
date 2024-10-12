import { describe, expect, it } from 'vitest';

import { getArrayDifference } from '~/src/functions/array/getArrayDifference.js';

describe('getArrayDifference(array1, array2)', () => {
  it('returns array 1 when the two arrays have no elements in common', () => {
    const array1 = [1, 2];
    const array2 = [3, 4];

    const difference = getArrayDifference(array1, array2);

    expect(difference).toStrictEqual(array1);
  });

  it('returns an empty array when array 2 includes array 1', () => {
    const array1 = [1, 2];
    const array2 = [1, 2, 3];

    const difference = getArrayDifference(array1, array2);

    expect(difference).toStrictEqual([]);
  });

  it('returns the elements exclusive to array 1 when the arrays intersect', () => {
    const array1 = [1, 2];
    const array2 = [2, 3];
    const expectedDifference = [1];

    const difference = getArrayDifference(array1, array2);

    expect(difference).toStrictEqual(expectedDifference);
  });
});
