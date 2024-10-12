import { describe, expect, it } from 'vitest';

import { beautify } from '~/src/functions/string/beautify.js';

describe('beautify()', () => {
  it('given an object should return its stringified version with a spacing of 2', () => {
    const input = { a: 1, b: 2 };
    const expected = '{ "a": 1, "b": 2 }';

    const beautified = beautify(input);

    expect(beautified).toBe(expected);
  });

  it('when the space value is given, should use that value for spacing', () => {
    const input = {
      a: '1'.repeat(80), // Use a long string so that the object displays on multiple lines
      b: 2,
    };
    const expected = [
      '{',
      `    "a": "${'1'.repeat(80)}",`,
      '    "b": 2',
      '}',
    ].join('\n');

    const beautified = beautify(input, { space: 4 });

    expect(beautified).toBe(expected);
  });

  it('when an array is provided as the replacer, should discard keys not in the array', () => {
    const input = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    };
    const expected = '{ "b": 2, "d": 4 }';

    const beautified = beautify(input, { replacer: ['b', 'd'] });

    expect(beautified).toBe(expected);
  });

  it('when the maxWidth value is given, should split lines whose length exceeds that value', () => {
    const input = {
      a: '1'.repeat(20), // Use a long string so that the object displays on multiple lines
      b: 2,
    };
    const expected = [
      '{',
      `  "a": "${'1'.repeat(20)}",`,
      '  "b": 2',
      '}',
    ].join('\n');

    const beautified = beautify(input, { maxWidth: 20 });

    expect(beautified).toBe(expected);
  });
});
