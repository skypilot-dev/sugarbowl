import { describe, expect, it } from 'vitest';

import { omitUndefinedEntries } from '~/src/functions/object/omitUndefinedEntries.js';

describe('omitUndefinedEntries(:object)', () => {
  it('given an object, should return a new object having only the defined values of the original', () => {
    const originalObj = { a: 1, b: undefined };

    const noUndefined = omitUndefinedEntries(originalObj);

    const expectedObj = { a: 1 };
    expect(noUndefined).toStrictEqual(expectedObj);
    expect(noUndefined).not.toHaveProperty('b');
  });

  it('given an object with all values defined, should return an equal but not identical object', () => {
    const originalObj = { a: 1, b: 2 };

    const noUndefined = omitUndefinedEntries(originalObj);

    expect(noUndefined).toEqual(originalObj);
    expect(noUndefined).not.toBe(originalObj);
  });

  it('given an object with no defined values, should return an empty object', () => {
    const originalObj = { a: undefined };

    const noUndefined = omitUndefinedEntries(originalObj);

    const expectedObj = {};
    expect(noUndefined).toStrictEqual(expectedObj);
    expect(noUndefined).not.toHaveProperty('a');
  });

  it('given an empty object, should return a non-identical empty object', () => {
    const originalObj = {};

    const noUndefined = omitUndefinedEntries(originalObj);

    const expectedObj = {};
    expect(noUndefined).toStrictEqual(expectedObj);
    expect(noUndefined).not.toBe(originalObj);
  });

  it('should retain null values', () => {
    const originalObj = { a: null };

    const noUndefined = omitUndefinedEntries(originalObj);

    const expectedObj = { a: null };
    expect(noUndefined).toStrictEqual(expectedObj);
  });
});
