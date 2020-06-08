import { getIntersection } from '../getIntersection';

describe('getIntersection(array1, array2)', () => {
  it('should return the elements of the 1st array, in order of appearance, that appear in the 2nd array', () => {
    const array1 = [1, 2, 3, 4, 5];
    const array2 = [3, 2, 5];

    const intersection = getIntersection(array1, array2);

    const expected = [2, 3, 5];
    expect(intersection).toStrictEqual(expected);
  });

  it('should allow duplicates', () => {
    const array1 = [1, 2, 2, 3];
    const array2 = [2, 1, 1];

    const intersection = getIntersection(array1, array2);

    const expected = [1, 2, 2];
    expect(intersection).toStrictEqual(expected);
  });

  it('when there is no intersection, should return an empty array', () => {
    const array1 = [1];
    const array2 = [2];

    const intersection = getIntersection(array1, array2);

    const expected: number[] = [];
    expect(intersection).toStrictEqual(expected);
  });
});
