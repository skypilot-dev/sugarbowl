import { describe, expect, it } from 'vitest';

import { parseInteger } from '~/src/functions/string/parseInteger.js';

describe('parseInteger()', () => {
  it('given the string representation of an integer, should return the integer', () => {
    const intString = '1';

    const integer = parseInteger(intString);

    const expected = 1;
    expect(integer).toBe(expected);
  });

  it('given an empty string, by default should return undefined', () => {
    const intString = '';

    const integer = parseInteger(intString);

    expect(integer).toBeUndefined();
  });

  it('given an empty string when `valueIfEmpty:0`, should return 0', () => {
    const intString = '';
    const options = { valueIfEmpty: 0 };

    const integer = parseInteger(intString, options);

    const expected = 0;
    expect(integer).toBe(expected);
  });

  it('given an empty string when `valueIfEmpty:null`, should return null', () => {
    const intString = '';
    const options = { valueIfEmpty: null };

    const integer = parseInteger(intString, options);

    expect(integer).toBeNull();
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

  it('should reject a non-zero value ', () => {
    const intString = '1';
    const options = { maxValue: 0 };

    expect(() => parseInteger(intString, options)).toThrow();
  });
});
