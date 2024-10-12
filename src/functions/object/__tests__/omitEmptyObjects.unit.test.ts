import { describe, expect, it } from 'vitest';

import { omitEmptyObjects } from '~/src/functions/object/omitEmptyObjects.js';

describe('omitEmptyObjects()', () => {
  it('should remove entries whose values are empty objects & return a new object containing the remaining entries', () => {
    const obj = { a: 1, items: [], obj: {} };
    const expected = { a: 1, items: [] };

    const noEmpty = omitEmptyObjects(obj);

    expect(noEmpty).toStrictEqual(expected);
  });

  it('given an object without empty objects, should return a copy of the original object', () => {
    const obj = { a: 1, b: { key: 'not empty' } };
    const expected = { a: 1, b: { key: 'not empty' } };

    const noEmpty = omitEmptyObjects(obj);

    expect(noEmpty).toStrictEqual(expected);
    expect(noEmpty).not.toBe(obj);
  });

  it('if all entries are removed, should return an empty object', () => {
    const obj = { items: {} };
    const expected = {};

    const noEmpty = omitEmptyObjects(obj);

    expect(noEmpty).toStrictEqual(expected);
  });

  it('given an empty object, should return a new empty object', () => {
    const obj = {};
    const expected = {};

    const noEmpty = omitEmptyObjects(obj);

    expect(noEmpty).toStrictEqual(expected);
    expect(noEmpty).not.toBe(obj);
  });
});
