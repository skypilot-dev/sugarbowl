import { describe, expect, it } from 'vitest';

import { omitNulls } from '~/src/functions/object/omitNulls.js';

describe('omitNulls(:object)', () => {
  it('given an object, should return a new object having only the non-null values of the original', () => {
    const originalObj = { a: 1, b: null };

    const actual = omitNulls(originalObj);

    const expected = { a: 1 };
    expect(actual).toStrictEqual(expected);
    expect(actual).not.toHaveProperty('b');
  });

  it('given an object with all values defined, should return an equal but not identical object', () => {
    const original = { a: 1, b: () => true };

    const actual = omitNulls(original);

    expect(actual).toEqual(original);
    expect(actual).not.toBe(original);
  });

  it('given an object with no non-null values, should return an empty object', () => {
    const original = { a: null };

    const actual = omitNulls(original);

    const expected = {};
    expect(actual).toStrictEqual(expected);
    expect(actual).not.toHaveProperty('a');
  });

  it('given an empty object, should return a non-identical empty object', () => {
    const originalObj = {};

    const actual = omitNulls(originalObj);

    const expected = {};
    expect(actual).toStrictEqual(expected);
    expect(actual).not.toBe(originalObj);
  });

  it('should retain undefined values', () => {
    const original = { a: 1, b: null };

    const actual = omitNulls(original);

    const expectedObj = { a: 1 };
    expect(actual).toStrictEqual(expectedObj);
  });
});
