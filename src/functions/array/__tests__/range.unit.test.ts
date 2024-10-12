import { describe, expect, it } from 'vitest';

import { range } from '../range.js';

describe('range(start:Integer, end:Integer)', () => {
  it('should return all integers from `start` to `end` inclusive', () => {
    const integers = range(1, 3);

    const expected = [1, 2, 3];
    expect(integers).toEqual(expected);
  });

  it('accepts negative integers', () => {
    const integers = range(-2, 1);

    const expected = [-2, -1, 0, 1];
    expect(integers).toEqual(expected);
  });

  it('given `start > end`, should return an empty array', () => {
    const integers = range(1, 0);

    const expected: number[] = [];
    expect(integers).toEqual(expected);
  });

  it('given `start = end`, should return a single value', () => {
    const integers = range(1, 1);

    const expected = [1];
    expect(integers).toEqual(expected);
  });
});
