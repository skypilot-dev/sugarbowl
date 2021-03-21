import { getLastItem } from '../getLastItem';

describe('getLastItem()', () => {
  it('if defaultValue is not undefined, return type should be narrowed to the item type', () => {
    const items: number[] = [];

    const lastItem = getLastItem(items, { defaultValue: 0 });
    // typeof lastItem: number

    // No TypeScript error here: `lastItem` is known to be a number
    expect(lastItem + 1).toBe(1);
  });
});
