import { describe, expect, it } from 'vitest';

import { mergeIf } from '~/src/functions/object/mergeIf.js';

describe('mergeIf()', () => {
  it('given a falsy value, should return an empty object', () => {
    const conditional = 0;
    const objectToMerge = { a: 1 };

    const result = mergeIf(conditional, objectToMerge);

    const expected = {};
    expect(result).toStrictEqual(expected);
  });

  it('given a truthy value, should return the object to merge', () => {
    const conditional = 'truthy';
    const objectToMerge = { a: 1 };

    const result = mergeIf(conditional, objectToMerge);

    const expected = { a: 1 };
    expect(result).toStrictEqual(expected);
  });
});

describe('mergeIf(), when used in an object-spread operation', () => {
  it('when truthy, should merge the object into the original', () => {
    const original = { a: 1 };
    const objectToMerge = { b: 2 };

    const combined = {
      ...original,
      ...mergeIf(true, objectToMerge),
    };

    const expected = { a: 1, b: 2 };
    expect(combined).toStrictEqual(expected);
  });

  it('should overwrite properties of the original', () => {
    const original = { a: { b: 1 } };
    const objectToMerge = { a: { c: 1 } };

    const combined = {
      ...original,
      ...mergeIf(1, objectToMerge),
    };

    const expected = { a: { c: 1 } };
    expect(combined).toStrictEqual(expected);
  });

  it('if falsy, should return a copy of the original', () => {
    const original = { a: 1 };
    const objectToMerge = { b: 2 };

    const combined = {
      ...original,
      ...mergeIf(false, objectToMerge),
    };

    const expected = { a: 1 };
    expect(combined).toStrictEqual(expected);
    expect(combined).not.toBe(original);
  });
});
