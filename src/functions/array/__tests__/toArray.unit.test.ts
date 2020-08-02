import { toArray } from '../toArray';

describe('toArray(value | value[])', () => {
  it('if the value is an array, should return the value', () => {
    const value: unknown[] = [];
    const array = toArray(value);
    expect(array).toBe(value);
  });

  it('if the value is not an array, should return a single-item array containing the value', () => {
    const value = 'string';
    const array = toArray(value);
    expect(array).toStrictEqual(['string']);
  });
});
