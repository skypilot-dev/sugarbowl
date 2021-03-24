import { toArray } from '../toArray';

describe('toArray(value | value[])', () => {
  it('if the value is an array, should return the value', () => {
    const value: unknown[] = [];
    const array = toArray(value);
    expect(array).toBe(value);
  });

  it('should accept a read-only array', () => {
    const value: readonly number[] = [1, 2];
    const array = toArray(value);
    expect(array).toStrictEqual([1, 2]);
  });

  it('if the value is not an array, should return a single-item array containing the value', () => {
    const value = 'string';
    const array = toArray(value);
    expect(array).toStrictEqual(['string']);
  });
});
