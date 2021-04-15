import { isIndefinite } from '../isIndefinite';

describe('isIndefinite(value: unknown)', () => {
  it('should return true if given undefined or a variable whose value is undefined', () => {
    let undef;
    expect(isIndefinite(undef)).toBe(true);
    expect(isIndefinite(undefined)).toBe(true);
  });

  it('should return true if given null or a variable whose value is null', () => {
    const nul = null;
    expect(isIndefinite(nul)).toBe(true);
    expect(isIndefinite(null)).toBe(true);
  });

  it('should return true if given a variable whose value has been set to be undefined', () => {
    const undef = undefined;
    expect(isIndefinite(undef)).toBe(true);
  });

  it('given any other primitive, should return false', () => {
    const primitives = [1, '', new Date(), 0];
    primitives.forEach(primitive => {
      expect(isIndefinite(primitive)).toBe(false);
    });
  });

  it('given a reference to an undefined array item, should return true', () => {
    const items: Array<number | undefined> = [1, undefined];
    expect(isIndefinite(items[1])).toBe(true);
    expect(isIndefinite(items[2])).toBe(true);
  });

  it('given a reference to an undefined object value, should return true', () => {
    const dict: Record<string, number | undefined> = { a: undefined };
    expect(isIndefinite(dict.a)).toBe(true);
    expect(isIndefinite(dict.b)).toBe(true);
  });

  it('should be usable as filter', () => {
    const mixedArray = [null, undefined, 1, 'value'] as const;
    const indefiniteArray = mixedArray.filter(isIndefinite);
    expect(indefiniteArray).toStrictEqual([null, undefined]);
  });
});
