import { omitEmptyArrays } from '../omitEmptyArrays';

describe('omitEmptyArrays()', () => {
  it('should remove entries whose values are empty arrays & return a new object containing the remaining entries', () => {
    const obj = { a: 1, items: [] };
    const expected = { a: 1 };

    const noEmpty = omitEmptyArrays(obj);

    expect(noEmpty).toStrictEqual(expected);
  });

  it('given an object without empty arrays, should return a copy of the original object', () => {
    const obj = { a: 1, b: ['not empty'] };
    const expected = { a: 1, b: ['not empty'] };

    const noEmpty = omitEmptyArrays(obj);

    expect(noEmpty).toStrictEqual(expected);
    expect(noEmpty).not.toBe(obj);
  });

  it('if all entries are removed, should return an empty object', () => {
    const obj = { items: [] };
    const expected = {};

    const noEmpty = omitEmptyArrays(obj);

    expect(noEmpty).toStrictEqual(expected);
  });

  it('given an empty object, should return a new empty object', () => {
    const obj = {};
    const expected = {};

    const noEmpty = omitEmptyArrays(obj);

    expect(noEmpty).toStrictEqual(expected);
    expect(noEmpty).not.toBe(obj);
  });
});
