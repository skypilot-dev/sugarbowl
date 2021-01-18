/* eslint-disable no-prototype-builtins */

import { hasOwnProperty } from '../hasOwnProperty';


describe('hasOwnProperty(obj: object, propertyName: string)', () => {
  it('should return true if propertyName is an own property of the object', () => {
    const obj = { a: 1 };
    expect(hasOwnProperty(obj, 'a')).toBe(true);
  });

  it('should return false if propertyName is not a property of the object', () => {
    const obj = { a: 1 };
    expect(hasOwnProperty(obj, 'nonexistent')).toBe(false);
  });

  it("should ignore the object's own `hasOwnProperty` method, if any", () => {
    const obj = {
      hasOwnProperty: (propName: string) => propName === 'a',
    };
    expect(obj.hasOwnProperty('a')).toBe(true);
    expect(hasOwnProperty(obj, 'a')).toBe(false);
  });

  it('should ignore inherited properties', () => {
    const proto = { a: 1 };
    const obj = Object.create(proto);

    expect(obj.a).toBe(1);
    expect(hasOwnProperty(obj, 'a')).toBe(false);
  });
});
