import type { NumberString } from '@skypilot/common-types';
import { describe, expect, it } from 'vitest';

import { isNumeric } from '~/src/functions/number/isNumeric.js';

describe('isNumeric(value: unknown)', () => {
  it('should return true if the value is a number', () => {
    const numbers = [-1, 0, 1.5];
    numbers.forEach(number => {
      expect(isNumeric(number)).toBe(true);
    });
  });

  it('should return true if the value is a numeric string', () => {
    const numericStrings: NumberString[] = ['-1', '0', '1.5'];
    numericStrings.forEach(numericString => {
      expect(isNumeric(numericString)).toBe(true);
    });
  });

  it('should return false if the value is a string containing no digits', () => {
    const nonnumericStrings = ['', 'a', '+', '-', '#'];
    nonnumericStrings.forEach(nonnumericString => {
      expect(isNumeric(nonnumericString)).toBe(false);
    });
  });

  it('should return false if the value is a string containing any non-digits', () => {
    const mixedStrings = ['1a', 'a1', '-1!', '0.e'];
    mixedStrings.forEach(mixedString => {
      expect(isNumeric(mixedString)).toBe(false);
    });
  });

  it('should return false if the value is NaN, null, undefined', () => {
    [NaN, null, undefined].forEach(value => {
      expect(isNumeric(value)).toBe(false);
    });
  });

  it('should return false if the value is an object, array, or function', () => {
    [{}, [], () => 1].forEach(obj => {
      expect(isNumeric(obj)).toBe(false);
    });
  });
});
