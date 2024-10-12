import { pickRandomItems } from '../pickRandomItems';

const sourceArray = [1, 2, 3, 4];

describe('pickRandomElements()', () => {
  it('should return the number of requested elements', () => {
    const randomItems = pickRandomItems(sourceArray, 3);
    expect(randomItems.length).toBe(3);
  });

  it('should not have any duplicate items', () => {
    const randomItems = pickRandomItems(sourceArray, 3);
    expect(randomItems.length).toBe(new Set(randomItems).size);
  });

  it('accepts a read-only array', () => {
    const readonlyArray: readonly string[] = ['a', 'b'];

    const randomItems = pickRandomItems(readonlyArray, 1);
    expect(randomItems.length).toBe(1);
  });
});
