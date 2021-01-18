import { isObject } from '../isObject';

describe('isObject(value: any)', () => {
  it('should return false if the value is any primitive', () => {
    const primitives = [true, false, 0, 1, '', 'non-empty-string'];
    for (const primitive of primitives) {
      expect(isObject(primitive)).toBe(false);
    }
  });

  it('should return false if the value is null', () => {
    expect(isObject(null)).toBe(false);
  });

  it('should return true if the value is a function', () => {
    const fn = (): void => void 0;
    expect(isObject(fn)).toBe(true);
  });

  it('should return true if the value is an array', () => {
    expect(isObject([])).toBe(true);
  });

  it('should return true for any class instance', () => {
    class MyClass {
      constructor(public prop?: unknown) {}
    }

    const instances = [
      new Date(),
      new Map(),
      new MyClass(),
      new Object(),
      new Set(),
      new WeakMap(),
    ];
    for (const instance of instances) {
      expect(isObject(instance)).toBe(true);
    }
  });

  it('should return true for an object instantiated with Object.create()', () => {
    const created = Object.create({ a: 1 });
    expect(isObject(created)).toBe(true);
  });

  it('should return true for any other object', () => {
    const plainObjects = [{}, { a: 1 }];
    for (const plainObject of plainObjects) {
      expect(isObject(plainObject)).toBe(true);
    }
  });
});
