import { toArray } from '../toArray';

describe('toArray(value | value[])', () => {
  it('if the value is an array, should return the value', () => {
    const value: unknown[] = [];
    const array = toArray(value);
    expect(array).toStrictEqual(value);
  });

  it('should accept a read-only array', () => {
    const value: readonly number[] = [1, 2];
    const array = toArray(value);
    expect(array).toStrictEqual([1, 2]);
  });

  it('if the value is not an array, should return a single-item array containing the value', () => {
    const value = 'string';
    const array = toArray(value);
    expect(array).toStrictEqual(['string']);
  });

  it('given undefined or null, by default should return that value in an array', () => {
    const indefinites = [null, undefined];

    indefinites.forEach(indefinite => {
      const expected = [indefinite];
      const actual = toArray(indefinite);
      expect(actual).toStrictEqual(expected);
    });
  });

  it('given a null value, should return an empty array if `emptyIfNull: true` or `emptyIfIndefinite: true`', () => {
    expect(
      toArray(null, { emptyIfNull: true })
    ).toStrictEqual([]);
    expect(
      toArray(null, { emptyIfIndefinite: true })
    ).toStrictEqual([]);
    expect(
      toArray(null, { emptyIfUndefined: true })
    ).toStrictEqual([null]);
  });

  it('given an undefined value, should return an empty array if `emptyIfUndefined: true` or `emptyIfIndefinite: true`', () => {
    expect(
      toArray(undefined, { emptyIfNull: true })
    ).toStrictEqual([undefined]);
    expect(
      toArray(undefined, { emptyIfIndefinite: true })
    ).toStrictEqual([]);
    expect(
      toArray(undefined, { emptyIfUndefined: true })
    ).toStrictEqual([]);
  });
});
