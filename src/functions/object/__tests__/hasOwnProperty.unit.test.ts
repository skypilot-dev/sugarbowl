import { describe, expect, it } from 'vitest';

import { hasOwnProperty } from '../hasOwnProperty.js';

describe('hasOwnProperty()', () => {
  it('returns true if the object has the property', () => {
    const target = { a: 'a' };

    expect(hasOwnProperty(target, 'a')).toBe(true);
  });

  it('returns false if the object does not have the property', () => {
    const target = { a: 'a' };

    expect(hasOwnProperty(target, 'b')).toBe(false);
  });

  it('if the object is an array and the key is an initialized index, returns true', () => {
    const target = ['a', undefined];

    expect(hasOwnProperty(target, '0')).toBe(true);
    expect(hasOwnProperty(target, '1')).toBe(true);
  });

  it('if the object is an array and the key is an uninitialized index, returns false', () => {
    const target = ['a'];

    expect(hasOwnProperty(target, '1')).toBe(false);
  });

  it('accepts a function as target', () => {
    const target = () => {};
    target.a = 'a';

    expect(hasOwnProperty(target, 'a')).toBe(true);
  });

  it.each([
    [Object.create({ a: 'a' }), 'a'],
    ['string', 'toString'],
  ])('if the property is inherited, returns false', (target, property) => {
    expect(hasOwnProperty(target, property)).toBe(false);
  });

  it.each([null, undefined])('if the target is %s, throws a TypeError', (target) => {
    expect(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      () => hasOwnProperty(target as any, 'a')
    ).toThrow(TypeError);
  });
});
