import { isUndefined } from '../isUndefined';
import { isDefined } from '../isDefined';

describe('isUndefined(value: unknown)', () => {
  it('should return true if given undefined or a variable whose value is undefined', () => {
    let undef;
    expect(isUndefined(undef)).toBe(true);
    expect(isUndefined(undefined)).toBe(true);
    expect(isDefined(undef)).toBe(false);
    expect(isDefined(undefined)).toBe(false);
  });

  it('should return true if given a variable whose value has been set to be undefined', () => {
    const undef = undefined;
    expect(isUndefined(undef)).toBe(true);
    expect(isDefined(undef)).toBe(false);
  });

  it('given any other primitive, should return false', () => {
    const primitives = [1, '', new Date(), 0, null];
    primitives.forEach(primitive => {
      expect(isUndefined(primitive)).toBe(false);
      expect(isDefined(primitive)).toBe(true);
    });
  });

  it('given a reference to an undefined array item, should return true', () => {
    const items: Array<number | undefined> = [1, undefined];
    expect(isUndefined(items[1])).toBe(true);
    expect(isUndefined(items[2])).toBe(true);
    expect(isDefined(items[1])).toBe(false);
    expect(isDefined(items[2])).toBe(false);
  });

  it('given a reference to an undefined object value, should return true', () => {
    const dict: Record<string, number | undefined> = { a: undefined };
    expect(isUndefined(dict.a)).toBe(true);
    expect(isUndefined(dict.b)).toBe(true);
    expect(isDefined(dict.a)).toBe(false);
    expect(isDefined(dict.b)).toBe(false);
  });
});
