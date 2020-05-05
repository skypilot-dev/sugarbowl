import { pushIf } from '../pushIf';

describe('pushIf(array, condition, item)', () => {
  it('should push an item to the array if the condition is truthy', () => {
    const array = ['a'];
    const condition = 1;
    const item = 'b';

    pushIf(array, condition, item);

    const expected = ['a', 'b'];
    expect(array).toEqual(expected);
  });

  it('should not push the item to the array if the condition is falsy', () => {
    const array = ['a'];
    const condition = null;
    const item = 'b';

    pushIf(array, condition, item);

    const expected = ['a'];
    expect(array).toEqual(expected);
  });
});
