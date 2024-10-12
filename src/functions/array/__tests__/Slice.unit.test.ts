import { describe, expect, it } from 'vitest';

import { Slice } from '../Slice.js';

const items = [1, 2, 3];

describe('Slice(startAt?: Integer, stopBefore?: Integer)', () => {
  it('should return a function that can slice()', () => {
    const slices = [Slice(), Slice(undefined, undefined), Slice(...[])];
    const expected = items;

    slices.forEach(slice => {
      const actual = slice(items);
      expect(actual).toStrictEqual(expected);
      expect(actual).not.toBe(expected);
    });
  });

  it('should return a function that can slice(0, 1)', () => {
    const slice = Slice(0, 1);
    const expected = [1];

    const actual = slice(items);
    expect(actual).toStrictEqual(expected);
  });

  it('should return a function that can slice(-1)', () => {
    const slices = [Slice(-1), Slice(-1, undefined)];
    const expected = [3];

    slices.forEach(slice => {
      const actual = slice(items);
      expect(actual).toStrictEqual(expected);
    });
  });

  it('should return a function that can slice(1, -1)', () => {
    const slice = Slice(1, -1);
    const expected = [2];

    const actual = slice(items);
    expect(actual).toStrictEqual(expected);
  });
});
