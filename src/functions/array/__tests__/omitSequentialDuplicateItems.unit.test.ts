import { omitSequentialDuplicateItems } from '../omitSequentialDuplicateItems';

describe('omitSequentialDuplicateItems', () => {
  it('given an empty array, should return the array', () => {
    const array: string[] = [];

    const noDuplicates = omitSequentialDuplicateItems(array);

    expect(noDuplicates).toStrictEqual([]);
    expect(noDuplicates).not.toBe(array);
  });
  it('should omit sequential duplicates but not nonsequential duplicates', () => {
    const array = [0, 1, 1, 2, 1];

    const noDuplicates = omitSequentialDuplicateItems(array);

    const expected = [0, 1, 2, 1];
    expect(noDuplicates).toStrictEqual(expected);
  });

  it('should be able to handle values of different types', () => {
    const array = [0, 'a', 'a', 1, 1];

    const noDuplicates = omitSequentialDuplicateItems(array);

    const expected = [0, 'a', 1];
    expect(noDuplicates).toStrictEqual(expected);
  });
});
