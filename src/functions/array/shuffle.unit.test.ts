import { shuffle } from './shuffle';

describe('shuffle()', () => {
  /* Used mixed types to prove that type doesn't matter */
  const sourceArray = [1, 2, 'a', {}, [-1, 2]];
  let shuffledArray;
  it('should return an array of the same length', () => {
    shuffledArray = shuffle(sourceArray);
    expect(shuffledArray.length).toBe(sourceArray.length);
    expect(shuffledArray).not.toBe(sourceArray);
  });

  it('should return an array containing the same items', () => {
    expect(new Set(shuffledArray)).toEqual(new Set(sourceArray));
  });
});
