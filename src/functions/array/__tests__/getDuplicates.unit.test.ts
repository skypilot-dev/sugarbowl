import { getDuplicates } from '../getDuplicates';

describe('getDuplicates(array)', () => {
  it('should return an array containing one of each duplicate value', () => {
    const array = [1, 1, 2, 1];

    const duplicates = getDuplicates(array);

    const expected = [1];
    expect(duplicates).toEqual(expected);
  });

  it('given an array without duplicates, should return an empty array', () => {
    const array = [1, 2, 3];

    const duplicates = getDuplicates(array);

    const expected = [] as const;
    expect(duplicates).toEqual(expected);
  });

  it('given an empty array, should return an empty array', () => {
    const array = [] as const;

    const duplicates = getDuplicates(array);

    const expected = [] as const;
    expect(duplicates).toEqual(expected);
  });

  it('can handle items of mixed types', () => {
    const array = [1, 'a', false, null, undefined, null];

    const duplicates = getDuplicates(array);

    const expected = [null];
    expect(duplicates).toEqual(expected);
  });
});
