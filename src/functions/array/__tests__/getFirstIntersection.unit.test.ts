import { describe, expect, it } from 'vitest';

import { getFirstIntersection } from '../getFirstIntersection.js';

describe('getFirstIntersection(rankedItems, referenceItems)', () => {
  it('should return the highest-ranked candidate that appears anywhere in the reference items', () => {
    const rankedItems = [5, 2, 1];
    const referenceItems = [1, 2, 3, 4];

    const firstIntersection = getFirstIntersection(rankedItems, referenceItems);

    const expected = 2;
    expect(firstIntersection).toBe(expected);
  });

  it('if there is no intersection, should return undefined', () => {
    const rankedItems = [1, 2];
    const referenceItems = [3, 4];

    const firstIntersection = getFirstIntersection(rankedItems, referenceItems);

    const expected = undefined;
    expect(firstIntersection).toBe(expected);
  });

  it('can handle an empty array of ranked items', () => {
    const rankedItems: number[] = [];
    const referenceItems = [1, 2];

    const firstIntersection = getFirstIntersection(rankedItems, referenceItems);

    const expected = undefined;
    expect(firstIntersection).toBe(expected);
  });

  it('can handle an empty array of reference items', () => {
    const rankedItems = [1, 2];
    const referenceItems: number[] = [];

    const firstIntersection = getFirstIntersection(rankedItems, referenceItems);

    const expected = undefined;
    expect(firstIntersection).toBe(expected);
  });
});
