import { pickRandomItem } from '../pickRandomItem';

describe('pickRandomItem()', () => {
  it('should return one item', () => {
    const sourceArray = [1, 2, 3, 4];

    const randomItem = pickRandomItem(sourceArray);

    expect(sourceArray).toContain(randomItem);
  });

  it('if the array has a single item, should return the item', () => {
    expect(pickRandomItem([1])).toBe(1);
  });

  it('if the array is empty, should throw an error', () => {
    expect(() => {
      pickRandomItem([]);
    }).toThrow();
  });
});
