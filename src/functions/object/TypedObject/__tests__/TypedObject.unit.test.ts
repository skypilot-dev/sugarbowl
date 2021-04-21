import { TypedObject } from '../TypedObject';

describe('TypeObject.keys(obj: Object | Array | number | string)', () => {
  it("should return the object's keys", () => {
    const obj = { a: 1, b: 2 } as const;
    const expected = ['a', 'b'];

    const objectKeys = TypedObject.keys(obj);
    expect(objectKeys).toStrictEqual(expected);
  });

  it('given an array, should return its index values as strings', () => {
    const obj = [1, 2] as const;
    const expected = ['0', '1'];

    const objectKeys = TypedObject.keys(obj);
    expect(objectKeys).toStrictEqual(expected);
  });

  it('given an empty object, should return an empty array', () => {
    const obj = {} as const;
    const expected = [] as const;

    const objectKeys = TypedObject.keys(obj);
    expect(objectKeys).toStrictEqual(expected);
  });

  it('given an empty array, should return an empty array', () => {
    const obj = [] as const;
    const expected = [] as const;

    const objectKeys = TypedObject.keys(obj);
    expect(objectKeys).toStrictEqual(expected);
  });

  it('given a string, should treat it as an array of characters', () => {
    {
      const arrayOfChars = 'abc';
      const expected = ['0', '1', '2'] as const;

      const objectKeys = TypedObject.keys(arrayOfChars);
      expect(objectKeys).toStrictEqual(expected);
    }
    {
      const arrayOfChars = '';
      const expected = [] as const;

      const objectKeys = TypedObject.keys(arrayOfChars);
      expect(objectKeys).toStrictEqual(expected);
    }
  });

  it('given a number, should return an empty array', () => {
    // Included because `Object.keys` does accept numbers
    const expected = [] as const;

    const objectKeys = TypedObject.keys(1);
    expect(objectKeys).toStrictEqual(expected);
  });
});


describe('TypedObject.entries(obj: Object | Array | number | string)', () => {
  it("should return the object's entries", () => {
    const obj = { a: 1, b: 2 } as const;
    const expected = [
      ['a', 1], ['b', 2],
    ];

    const objectEntries = TypedObject.entries(obj);
    expect(objectEntries).toStrictEqual(expected);
    expect(TypedObject.entries(obj)).toStrictEqual(expected);
  });

  it('given an empty object, should return an empty array', () => {
    const obj = {} as const;
    const expected = [] as const;

    const objectEntries = TypedObject.entries(obj);
    expect(objectEntries).toStrictEqual(expected);
  });

  it('given an array, should return its indexes as strings and its items as values', () => {
    const obj = [1, 2] as const;
    const expected = [
      ['0', 1], ['1', 2],
    ];

    const objectEntries = TypedObject.entries(obj);
    expect(objectEntries).toStrictEqual(expected);
  });

  it('given an empty array, should return an empty array', () => {
    const obj = [] as const;
    const expected = [] as const;

    const objectEntries = TypedObject.entries(obj);
    expect(objectEntries).toStrictEqual(expected);
  });

  it('given a string, should treat it as an array of characters', () => {
    {
      const arrayOfChars = 'abc';
      const expected = [
        ['0', 'a'], ['1', 'b'], ['2', 'c'],
      ] as const;

      const objectEntries = TypedObject.entries(arrayOfChars);
      expect(objectEntries).toStrictEqual(expected);
    }
    {
      const arrayOfChars = '';
      const expected = [] as const;

      const objectEntries = TypedObject.entries(arrayOfChars);
      expect(objectEntries).toStrictEqual(expected);
    }
  });

  it('given a number, should return an empty array', () => {
    // Included because `Object.entries` does accept numbers
    const expected = [] as const;

    const objectEntries = TypedObject.entries(1);
    expect(objectEntries).toStrictEqual(expected);
  });
});
