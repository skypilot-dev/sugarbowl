import { isDefinite } from '../isDefinite';

describe('isDefinite(value: unknown)', () => {
  it('should return false if given undefined or a variable whose value is undefined', () => {
    let undef;
    expect(isDefinite(undef)).toBe(false);
    expect(isDefinite(undefined)).toBe(false);
  });

  it('should return false if given null or a variable whose value is null', () => {
    const nul = null;
    expect(isDefinite(nul)).toBe(false);
    expect(isDefinite(null)).toBe(false);
  });

  it('should return false if given a variable whose value has been set to be undefined', () => {
    const undef = undefined;
    expect(isDefinite(undef)).toBe(false);
  });

  it('given any other primitive, should return true', () => {
    const primitives = [1, '', new Date(), 0];
    primitives.forEach(primitive => {
      expect(isDefinite(primitive)).toBe(true);
    });
  });

  it('given a reference to an undefined array item, should return false', () => {
    const items: Array<number | undefined> = [1, undefined];
    expect(isDefinite(items[1])).toBe(false);
    expect(isDefinite(items[2])).toBe(false);
  });

  it('given a reference to an undefined object value, should return false', () => {
    const dict: Record<string, number | undefined> = { a: undefined };
    expect(isDefinite(dict.a)).toBe(false);
    expect(isDefinite(dict.b)).toBe(false);
  });

  it('should be usable as filter', () => {
    const mixedArray = [null, undefined, 1, 'value'] as const;
    const definiteArray = mixedArray.filter(isDefinite);
    expect(definiteArray).toStrictEqual([1, 'value']);
  });
});
