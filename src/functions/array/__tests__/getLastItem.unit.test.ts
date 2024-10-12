import { describe, expect, it } from 'vitest';

import { getLastItem } from '../getLastItem.js';

describe('getLastItem', () => {
  it('should return the last item in the array', () => {
    const items = [1, 2];

    const lastItem = getLastItem(items);

    expect(lastItem).toBe(2);
  });

  it('if the array is empty, should return undefined', () => {
    const items = [] as const;

    const lastItem = getLastItem(items);

    expect(lastItem).toBeUndefined();
  });

  it('if a defaultValue is given and the the array is empty, should return the default value', () => {
    const items: number[] = [];

    const lastItem = getLastItem(items, { defaultValue: 1 });

    expect(lastItem).toBe(1);
  });
});
