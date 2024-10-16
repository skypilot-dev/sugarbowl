import { describe, expect, it } from 'vitest';

import { omitEmpty } from '~/src/functions/object/omitEmpty.js';

describe('omitEmpty()', () => {
  it('should remove entries whose values are empty objects or empty arrays & return a new object containing the remaining entries', () => {
    const obj = { a: 1, items: [], obj: {} };
    const expected = { a: 1 };

    const noEmpty = omitEmpty(obj);

    expect(noEmpty).toStrictEqual(expected);
  });

  it('given an object without empty objects or arrays, should return a copy of the original object', () => {
    const obj = { a: 1, b: { key: 'not empty' } };
    const expected = { a: 1, b: { key: 'not empty' } };

    const noEmpty = omitEmpty(obj);

    expect(noEmpty).toStrictEqual(expected);
    expect(noEmpty).not.toBe(obj);
  });

  it('if all entries are removed, should return an empty object', () => {
    const obj = { obj: {}, items: {} };
    const expected = {};

    const noEmpty = omitEmpty(obj);

    expect(noEmpty).toStrictEqual(expected);
  });

  it('given an empty object, should return a new empty object', () => {
    const obj = {};
    const expected = {};

    const noEmpty = omitEmpty(obj);

    expect(noEmpty).toStrictEqual(expected);
    expect(noEmpty).not.toBe(obj);
  });
});
