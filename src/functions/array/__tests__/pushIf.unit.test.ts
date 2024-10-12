import { describe, expect, it } from 'vitest';

import { pushIf } from '../pushIf.js';

describe('pushIf(array, condition, item)', () => {
  it('should push an item to the array if the condition is truthy', () => {
    const array = ['a'];
    const item = 'b';
    const condition = 1;

    pushIf(array, item, condition);

    const expected = ['a', 'b'];
    expect(array).toEqual(expected);
  });

  it('should not push the item to the array if the condition is falsy', () => {
    const array = ['a'];
    const item = 'b';
    const condition = null;

    pushIf(array, item, condition);

    const expected = ['a'];
    expect(array).toEqual(expected);
  });

  it('if no condition is given, should push a truthy item', () => {
    const array = ['a'];
    const item = 'b';

    pushIf(array, item);

    const expected = ['a', 'b'];
    expect(array).toEqual(expected);
  });

  it('if no condition is given, should not push a falsy item', () => {
    const array = ['a'];
    const item = '';

    pushIf(array, item);

    const expected = ['a'];
    expect(array).toEqual(expected);
  });
});
