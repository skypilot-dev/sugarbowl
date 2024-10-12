import { describe, expect, it } from 'vitest';

import { toMapFunction } from '~/src/functions/hof/toMapFunction.js';

describe('toMapFunction(:itemFn)', () => {
  it('given a function, return a function that applies the function to every item in an array', () => {
    const toUpperCase = (aString: string): string => aString.toUpperCase();
    const allToUpperCase = toMapFunction(toUpperCase);

    const result = allToUpperCase(['a', 'b']);

    expect(result).toEqual(['A', 'B']);
  });

  it('given 3 functions, return a function that applies all the functions to every item in an array', () => {
    const trim = (aString: string): string => aString.trim();
    const toUpperCase = (aString: string): string => aString.toUpperCase();
    const omitLetter = (aString: string, letter: string): string => aString.replace(letter, '');

    const mapFn = toMapFunction(trim, toUpperCase, omitLetter);
    const result = mapFn([' abc', 'bcd '], 'B');

    expect(result).toEqual(['AC', 'CD']);
  });

  it('given 3 functions that each require params, return a function that accepts all params and applies the combined function with params to every item in an array', () => {
    const trim = (aString: string): string => aString.trim();
    const toUpperOrLower = (aString: string, toUpper: boolean): string =>
      toUpper ? aString.toUpperCase() : aString.toLowerCase();
    const omitLetter = (aString: string, letter: string): string => aString.replace(letter, '');

    const mapFn = toMapFunction(trim, toUpperOrLower, omitLetter);

    /* Define params for the 2nd & 3rd functions. */
    let toUpper = true;
    let letterToOmit = 'B';
    let result = mapFn([' abc', 'bcd '], toUpper, letterToOmit);
    expect(result).toEqual(['AC', 'CD']);

    /* Check a different set of params for the 2nd & 3rd functions. */
    toUpper = false;
    letterToOmit = 'a';
    result = mapFn(['ABC ', ' DEA'], toUpper, letterToOmit);
    expect(result).toEqual(['bc', 'de']);
  });
});
