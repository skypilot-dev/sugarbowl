import { getObjectEntries } from '../getObjectEntries';

describe('getObjectEntries(obj: Object | Array)', () => {
  it("should return the object's entries", () => {
    const obj = { a: 1, b: 2 } as const;
    const expected = [
      ['a', 1], ['b', 2],
    ];

    const objectEntries = getObjectEntries(obj);
    expect(objectEntries).toStrictEqual(expected);
  });

  it('given an empty object, should return an empty array', () => {
    const obj = {} as const;
    const expected = [] as const;

    const objectEntries = getObjectEntries(obj);
    expect(objectEntries).toStrictEqual(expected);
  });

  it('given an array, should return its indexes as strings and its items as values', () => {
    const obj = [1, 2] as const;
    const expected = [
      ['0', 1], ['1', 2],
    ];

    const objectEntries = getObjectEntries(obj);
    expect(objectEntries).toStrictEqual(expected);
  });

  it('given an empty array, should return an empty array', () => {
    const obj = [] as const;
    const expected = [] as const;

    const objectEntries = getObjectEntries(obj);
    expect(objectEntries).toStrictEqual(expected);
  });
});
