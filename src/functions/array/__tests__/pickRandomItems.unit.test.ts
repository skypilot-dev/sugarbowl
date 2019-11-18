import { pickRandomItems } from '../pickRandomItems';
import { toUniqueArray } from '../toUniqueArray';

describe('pickRandomElements()', () => {
  let randomItems: number[];
  it('should return the number of requested elements', () => {
    const sourceArray = [1, 2, 3, 4];
    randomItems = pickRandomItems(sourceArray, 3);
    expect(randomItems.length).toBe(3);
  });

  it('should not have any duplicate items', () => {
    expect(randomItems.length).toBe(toUniqueArray(randomItems).length);
  });
});
