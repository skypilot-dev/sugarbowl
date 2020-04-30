import { parseInteger } from '../parseInteger';

describe('parseInteger()', () => {
  it('given the string representation of an integer, should return the integer', () => {
    const intString = '1';

    const integer = parseInteger(intString);

    const expected = 1;
    expect(integer).toBe(expected);
  });

  it('given an empty string, by default should return null', () => {
    const intString = '';

    const integer = parseInteger(intString);

    const expected = null;
    expect(integer).toBe(expected);
  });

  it('given an empty string when `emptyEquals0:true`, should return 0', () => {
    const intString = '';
    const options = { emptyEquals0: true };

    const integer = parseInteger(intString, options);

    const expected = 0;
    expect(integer).toBe(expected);
  });

  it('given an empty string when disallowed, should throw an error', () => {
    const intString = '';
    const options = { disallowEmpty: true };

    expect(() => parseInteger(intString, options)).toThrow();
  });

  /* TODO: Support negative values. */
  it('should reject strings that contain any non-digits', () => {
    const badStrings = ['1 0', '1a', 'a1', '1!'];

    badStrings.forEach((intString: string) => {
      expect(() => parseInteger(intString)).toThrow();
    });
  });

  it('should reject a value that is less than the minimum', () => {
    const intString = '0';
    const options = { minValue: 1 };

    expect(() => parseInteger(intString, options)).toThrow();
  });

  it('should reject a value that is greater than the maximum', () => {
    const intString = '1';
    const options = { maxValue: 0 };

    expect(() => parseInteger(intString, options)).toThrow();
  });
});
