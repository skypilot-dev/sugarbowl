import { describe, expect, it } from 'vitest';

import { shuffle } from '../shuffle.js';

describe('shuffle()', () => {
  /* Used mixed types to prove that type doesn't matter */
  const sourceArray = [1, 2, 'a', {}, [-1, 2]];
  let shuffledArray: unknown[];
  it('should return an array of the same length', () => {
    shuffledArray = shuffle(sourceArray);
    expect(shuffledArray.length).toBe(sourceArray.length);
    expect(shuffledArray).not.toBe(sourceArray);
  });

  it('should return an array containing the same items', () => {
    expect(new Set(shuffledArray)).toStrictEqual(new Set(sourceArray));
  });
});
