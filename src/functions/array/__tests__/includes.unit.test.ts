import { includes } from '../includes';

describe('includes(item, searchItem, fromIndex?: number)', () => {
  it('returns true if the string is in the array of strings', () => {
    const items = ['a', 'b', 'c'];
    const itemInList = 'b';
    const itemNotInList = 'd';

    expect(includes(items, itemInList)).toBe(true);
    expect(includes(items, itemNotInList)).toBe(false);
  });

  it('returns true if the number is in the array of numbers', () => {
    const items = [1, 2, 3];
    const itemInList = 1;
    const itemNotInList = 4;

    expect(includes(items, itemInList)).toBe(true);
    expect(includes(items, itemNotInList)).toBe(false);
  });

  it.each([undefined, 1, 'a', true, {}])('returns false if the array is empty', (searchItem) => {
    expect(includes([], searchItem)).toBe(false);
  });

  it('starts the search from fromIndex if given', () => {
    const items = [0, 1, 2];
    const searchItem = 1;
    const searchItemIndex = 1;

    expect(includes(items, searchItem, searchItemIndex - 1)).toBe(true);
    expect(includes(items, searchItem, searchItemIndex)).toBe(true);
    expect(includes(items, searchItem, searchItemIndex + 1)).toBe(false);
  });
});
