export {};

const obj1 = { a: 1, b: 2 };
const obj2 = { a: 3, b: 4 };

const weak = new WeakMap([
  [obj1, '1st entry'],
  [obj2, '2nd entry'],
]);

describe('WeakMap()', () => {
  it('should', () => {
    expect(weak.has(obj1)).toBe(true);
  });

  it('should', () => {
    expect(weak.has(obj1)).toBe(true);
  });
});
