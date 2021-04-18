import { getObjectKeys } from '../getObjectKeys';

describe('getObjectKeys(obj: Object | Array | number | string)', () => {
  it("should return the object's keys and be correctly typed", () => {
    const obj = { a: 1, b: 2 } as const;
    const expected = ['a', 'b'];

    const objectKeys = getObjectKeys(obj);
    expect(objectKeys).toStrictEqual(expected);
  });

  it('given an array, should return its index values as strings', () => {
    const obj = [1, 2] as const;
    const expected = ['0', '1'];

    const objectKeys = getObjectKeys(obj);
    expect(objectKeys).toStrictEqual(expected);
  });

  it('given an empty object, should return an empty array', () => {
    const obj = {} as const;
    const expected = [] as const;

    const objectKeys = getObjectKeys(obj);
    expect(objectKeys).toStrictEqual(expected);
  });

  it('given an empty array, should return an empty array', () => {
    const obj = [] as const;
    const expected = [] as const;

    const objectKeys = getObjectKeys(obj);
    expect(objectKeys).toStrictEqual(expected);
  });

  it('given a string, should treat it as an array of characters', () => {
    {
      const arrayOfChars = 'abc';
      const expected = ['0', '1', '2'] as const;

      const objectKeys = getObjectKeys(arrayOfChars);
      expect(objectKeys).toStrictEqual(expected);
    }
    {
      const arrayOfChars = '';
      const expected = [] as const;

      const objectKeys = getObjectKeys(arrayOfChars);
      expect(objectKeys).toStrictEqual(expected);
    }
  });

  it('given a number, should return an empty array', () => {
    // Included because `Object.keys` does accept numbers
    const expected = [] as const;

    const objectKeys = getObjectKeys(1);
    expect(objectKeys).toStrictEqual(expected);
  });
});
