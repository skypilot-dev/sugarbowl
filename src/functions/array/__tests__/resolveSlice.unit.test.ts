import { describe, expect, it } from 'vitest';

import { resolveSlice } from '../resolveSlice.js';

describe('resolveSlice()', () => {
  it('should compute startAt, stopBefore, first, last & length based on provided startAt & stopBefore', () => {
    const items = [1, 2, 3] as const;
    {
      const slice = [0, 3];
      const expected = {
        startAt: 0,
        stopBefore: 3,
        first: 0,
        last: 2,
        length: 3,
      };

      const arrayActual = resolveSlice(slice, items);
      const lengthActual = resolveSlice( slice, 3);
      expect(arrayActual).toStrictEqual(expected);
      expect(lengthActual).toStrictEqual(expected);
    }
    {
      const slice = [2, 3] as const;
      const expected = {
        startAt: 2,
        stopBefore: 3,
        first: 2,
        last: 2,
        length: 1,
      };

      const actual = resolveSlice(slice, items);
      expect(actual).toStrictEqual(expected);
    }
  });

  it('should constrain first-item index & stopAt to no less than zero', () => {
    const items = [1, 2, 3];
    const slice = [-4, 3];
    const expected = {
      first: 0,
      last: 2,
      length: 3,
      startAt: 0,
      stopBefore: 3,
    };

    const actual = resolveSlice(slice, items);
    expect(actual).toStrictEqual(expected);
  });

  it('should constrain lastIndex & stopBefore to the index of the last item', () => {
    const items = [1, 2, 3];
    const slice = [1, 4];
    const expected = {
      first: 1,
      last: 2,
      length: 2,
      startAt: 1,
      stopBefore: 3,
    };

    const actual = resolveSlice(slice, items);
    expect(actual).toStrictEqual(expected);
  });

  it('if startAt is negative it should be resolved relative to the end of the array', () => {
    const items = [1, 2, 3];
    {
      const slice = [-5, 2];
      const expected = {
        first: 0,
        last: 1,
        length: 2,
        startAt: 0, // absolute position = -3, but must be at least 0
        stopBefore: 2,
      };

      const actual = resolveSlice(slice, items);
      expect(actual).toStrictEqual(expected);
    }
  });

  it('given undefined startAt, should set it to 0', () => {
    const items = [1, 2, 3];
    const slice = [undefined, 3];
    const expected = {
      first: 0,
      last: 2,
      length: 3,
      startAt: 0,
      stopBefore: 3,
    };

    const actual = resolveSlice(slice, items);
    expect(actual).toStrictEqual(expected);
  });

  it('given undefined stopBefore, should set it to the length of the array', () => {
    const items = [1, 2, 3];
    const slice = [1, undefined];
    const expected = {
      first: 1,
      last: 2,
      length: 2,
      startAt: 1,
      stopBefore: 3,
    };

    const actual = resolveSlice(slice, items);
    expect(actual).toStrictEqual(expected);
  });

  it('given undefined startAt & stopBefore, should set them to [0, array length] (the entire array)', () => {
    const items = [1, 2, 3];
    const slice = [undefined, undefined];
    const expected = {
      first: 0,
      last: 2,
      length: 3,
      startAt: 0,
      stopBefore: 3,
    };

    const actual = resolveSlice(slice, items);
    expect(actual).toStrictEqual(expected);
  });

  it('should constrain slice references & indices to the size of the array', () => {
    const items = [1, 2, 3];
    {
      const slice = [-5, 5];
      const expected = {
        startAt: 0,
        stopBefore: 3,
        first: 0,
        last: 2,
        length: 3,
      };

      const actual = resolveSlice(slice, items);
      expect(actual).toStrictEqual(expected);
    }
    {
      const slice = [2, -5];

      const actual = resolveSlice(slice, items);
      expect(actual).toBeNull();
    }
  });

  it('if startAt references an index higher than the index of the last item, should return null', () => {
    const items = [1, 2, 3];
    const slice = [3, 4];

    const actual = resolveSlice(slice, items);
    expect(actual).toBeNull();
  });

  it('if startAt references an index >= stopBefore, should return null', () => {
    const items = [1, 2, 3];
    const slice = [2, -3];

    const actual = resolveSlice(slice, items);
    expect(actual).toBeNull();
  });

  it('given an empty array, should return null', () => {
    const items: number[] = [];

    const startAtValues = [-1, undefined, 0, 1];
    const stopBeforeValues = [-1, undefined, 0, 1];
    for (const startAt of startAtValues) {
      for (const stopBefore of stopBeforeValues) {
        const slice = [startAt, stopBefore];
        const actual = resolveSlice(slice, items);
        expect(actual).toBeNull();
      }
    }
  });
});
