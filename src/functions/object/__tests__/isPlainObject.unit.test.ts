import { isPlainObject } from '../isPlainObject';

describe('isPlainObject(value: any)', () => {
  it('should return false if the value is any primitive', () => {
    const primitives = [true, false, 0, 1, '', 'non-empty-string'];
    for (const primitive of primitives) {
      expect(isPlainObject(primitive)).toBe(false);
    }
  });

  it('should return false if the value is a function', () => {
    const fn = (): void => void 0;
    expect(isPlainObject(fn)).toBe(false);
  });

  it('should return false if the value is an array', () => {
    expect(isPlainObject([])).toBe(false);
  });

  it('should return false for an instance of any class other than Object', () => {
    class MyClass {
      constructor(public prop?: unknown) {}
    }

    const instances = [
      new Date(),
      new Map(),
      new MyClass(),
      new Set(),
      new WeakMap(),
    ];
    for (const instance of instances) {
      expect(isPlainObject(instance)).toBe(false);
    }
  });

  it('should return true for any other object', () => {
    const plainObjects = [{}, { a: 1 }, new Object()];
    for (const plainObject of plainObjects) {
      expect(isPlainObject(plainObject)).toBe(true);
    }
  });
});
