import { TypedObject } from '../TypedObject';

describe('TypedObject.entries(obj: Object | Array | number | string)', () => {
  it("should return the object's entries", () => {
    const obj = { a: 1, b: 2 } as const;
    const expected = [
      ['a', 1], ['b', 2],
    ];

    const actual = TypedObject.entries(obj);
    expect(actual).toStrictEqual(expected);
  });

  it('given an empty object, should return an empty array', () => {
    const obj = {} as const;
    const expected = [] as const;

    const actual = TypedObject.entries(obj);
    expect(actual).toStrictEqual(expected);
  });

  it('given an array, should return its indexes as strings and its items as values', () => {
    const obj = [1, 2] as const;
    const expected = [
      ['0', 1], ['1', 2],
    ];

    const actual = TypedObject.entries(obj);
    expect(actual).toStrictEqual(expected);
  });

  it('given an empty array, should return an empty array', () => {
    const obj = [] as const;
    const expected = [] as const;

    const actual = TypedObject.entries(obj);
    expect(actual).toStrictEqual(expected);
  });

  it('given a string, should treat it as an array of characters', () => {
    {
      const arrayOfChars = 'abc';
      const expected = [
        ['0', 'a'], ['1', 'b'], ['2', 'c'],
      ] as const;

      const actual = TypedObject.entries(arrayOfChars);
      expect(actual).toStrictEqual(expected);
    }
    {
      const arrayOfChars = '';
      const expected = [] as const;

      const actual = TypedObject.entries(arrayOfChars);
      expect(actual).toStrictEqual(expected);
    }
  });

  it('given a number, should return an empty array', () => {
    // Included because `Object.entries` does accept numbers
    const expected = [] as const;

    const actual = TypedObject.entries(1);
    expect(actual).toStrictEqual(expected);
  });
});

describe('TypeObject.keys(obj: Object | Array | number | string)', () => {
  it("should return the object's keys", () => {
    const obj = { a: 1, b: 2 } as const;
    const expected = ['a', 'b'];

    const actual = TypedObject.keys(obj);
    expect(actual).toStrictEqual(expected);
  });

  it('given an array, should return its index values as strings', () => {
    const obj = [1, 2] as const;
    const expected = ['0', '1'];

    const actual = TypedObject.keys(obj);
    expect(actual).toStrictEqual(expected);
  });

  it('given an empty object, should return an empty array', () => {
    const obj = {} as const;
    const expected = [] as const;

    const actual = TypedObject.keys(obj);
    expect(actual).toStrictEqual(expected);
  });

  it('given an empty array, should return an empty array', () => {
    const obj = [] as const;
    const expected = [] as const;

    const actual = TypedObject.keys(obj);
    expect(actual).toStrictEqual(expected);
  });

  it('given a string, should treat it as an array of characters', () => {
    {
      const arrayOfChars = 'abc';
      const expected = ['0', '1', '2'] as const;

      const actual = TypedObject.keys(arrayOfChars);
      expect(actual).toStrictEqual(expected);
    }
    {
      const arrayOfChars = '';
      const expected = [] as const;

      const actual = TypedObject.keys(arrayOfChars);
      expect(actual).toStrictEqual(expected);
    }
  });

  it('given a number, should return an empty array', () => {
    // Included because `Object.keys` does accept numbers
    const expected = [] as const;

    const actual = TypedObject.keys(1);
    expect(actual).toStrictEqual(expected);
  });
});
