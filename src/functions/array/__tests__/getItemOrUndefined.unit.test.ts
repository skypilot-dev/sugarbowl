import { describe, expect, it } from '@jest/globals';

import { firstItem, getItemOrUndefined, lastItem } from '../getItemOrUndefined';

describe('getItemOrUndefined(array)(relativeIndex)', () => {
  it.each([undefined, []])('if the array is empty or undefined, returns undefined', (empty) => {
    expect(getItemOrUndefined(empty)(0)).toBe(undefined);
    expect(getItemOrUndefined(empty)(-1)).toBe(undefined);
  });

  const items = [0, 1, 2];
  describe('relIndex >= 0', () => {
    it('if the (relIndex + 1)th item exists, returns it', () => {
      expect(getItemOrUndefined(items)(0)).toBe(0);
      expect(getItemOrUndefined(items)(2)).toBe(2);
    });

    it('if the (relIndex + 1)th item does not exist, returns undefined', () => {
      expect(getItemOrUndefined(items)(3)).toBe(undefined);
    });
  });
  describe('relIndex < 0', () => {
    it('if the (length - relIndex)th item exists, returns it', () => {
      expect(getItemOrUndefined(items)(-1)).toBe(2);
      expect(getItemOrUndefined(items)(-3)).toBe(0);
    });

    it('if the (length - relIndex)th item does not exist, returns undefined', () => {
      expect(getItemOrUndefined(items)(-4)).toBe(undefined);
    });
  });
});

describe('firstItem(), lastItem()', () => {
  it('returns the first or last item if one exists', () => {
    expect(firstItem([0, 1])).toBe(0);
    expect(lastItem([0, 1])).toBe(1);
  });

  it('returns undefined if the array is empty', () => {
    expect(firstItem([])).toBe(undefined);
    expect(lastItem([])).toBe(undefined);
  });

  it('returns undefined if the array does not exist', () => {
    expect(firstItem(undefined)).toBe(undefined);
    expect(lastItem(undefined)).toBe(undefined);
  });
});
