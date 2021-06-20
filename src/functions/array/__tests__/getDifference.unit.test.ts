import { getDifference } from '../getDifference';

describe('getDifference(array1, array2)', () => {
  it('should return the elements of the 1st array, in order of appearance, that do not appear in the 2nd array', () => {
    const array1 = [1, 2, 3, 4, 5];
    const array2 = [3, 2, 5];
    const expected = [1, 4];

    const difference = getDifference(array1, array2);

    expect(difference).toStrictEqual(expected);
  });

  it('should allow duplicates', () => {
    const array1 = [1, 2, 3, 3];
    const array2 = [2, 1, 1];
    const expected = [3, 3];

    const difference = getDifference(array1, array2);

    expect(difference).toStrictEqual(expected);
  });

  it('when there is no difference, should return an empty array', () => {
    const array1 = [1, 2, 2];
    const array2 = [2, 1];
    const expected: number[] = [];

    const difference = getDifference(array1, array2);

    expect(difference).toStrictEqual(expected);
  });

  it('when the first array is empty, should return an empty array', () => {
    const array1: number[] = [];
    const array2 = [1, 2];
    const expected: number[] = [];

    const difference = getDifference(array1, array2);

    expect(difference).toStrictEqual(expected);
    expect(difference).not.toBe(array1);
  });

  it('when the second array is empty, should return all elements of the first array', () => {
    const array1 = [1, 2, 2];
    const array2: number[] = [];
    const expected = [1, 2, 2];

    const difference = getDifference(array1, array2);

    expect(difference).toStrictEqual(expected);
    expect(difference).not.toBe(array1);
  });
});
