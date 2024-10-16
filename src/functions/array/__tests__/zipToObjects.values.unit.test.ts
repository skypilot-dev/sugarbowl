import { describe, expect, it } from 'vitest';

import { zipToObjects } from '../zipToObjects.js';

describe('zipToObjects', () => {
  it("should combine the arrays in the object's values", () => {
    const recordMap = {
      cardinal: ['one', 'two'],
      ordinal: ['first', 'second'],
    };
    const expected = [
      { cardinal: 'one', ordinal: 'first' },
      { cardinal: 'two', ordinal: 'second' },
    ];

    const actual = zipToObjects(recordMap);
    expect(actual).toStrictEqual(expected);
  });

  it('if an array is shorter than the longest array, missing values should be undefined', () => {
    const recordMap = {
      a: ['1', '2'],
      b: ['3'],
    };
    const expected = [
      { a: '1', b: '3' },
      { a: '2', b: undefined },
    ];

    const actual = zipToObjects(recordMap);
    expect(actual).toStrictEqual(expected);
  });

  it('if `omitUndefined: true`, should omit entries whose values are undefined ', () => {
    const options = { omitUndefined: true };
    const recordMap = {
      a: ['1', '2'],
      b: ['3'],
    };
    const expected = [
      { a: '1', b: '3' },
      { a: '2' },
    ];

    const actual = zipToObjects(recordMap, options);
    expect(actual).toStrictEqual(expected);
  });

  it('given only empty arrays, should return an empty array', () => {
    const recordMap = {
      a: [],
      b: [],
    };
    const expected: { a: number | undefined; b: number | undefined }[] = [];

    const actual = zipToObjects(recordMap);
    expect(actual).toStrictEqual(expected);
  });
});
