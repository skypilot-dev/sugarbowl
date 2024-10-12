import { describe, expect, it } from 'vitest';

import { extendFunction } from '~/src/functions/hof/extendFunction.js';

type Integer = number;

describe('extendFunction()', () => {
  it('given two functions, should return a function that returns the result of the two functions', () => {
    const numberToString = (aNumber: number): string => aNumber.toString();
    const padLeftAndRight = (aString: string): string => ` ${aString} `;

    const extendedFn = extendFunction(numberToString, padLeftAndRight);
    const result = extendedFn(123);

    expect(result).toBe(' 123 ');
  });

  it('given a function that creates an array & a function that acts on an array, should return a function that creates & acts on an array', () => {
    const stringToArray = (aString: string): string[] => aString.split('|');
    const upperCaseArray = (strings: string[]): string[] => strings.map((str) => str.toUpperCase());

    const extendedFn = extendFunction(stringToArray, upperCaseArray);
    const result = extendedFn('abc|def');

    expect(result).toEqual(['ABC', 'DEF']);
  });

  it('given two functions, each accepting 2 args, should return a function that accepts 3 args & returns the combined result', () => {
    const numberToString = (aNumber: number): string => aNumber.toString();
    const removeChar = (aString: string, charToRemove: string): string => aString.replace(charToRemove, '');

    const extendedFn = extendFunction(numberToString, removeChar);
    const result = extendedFn(123, '2');

    expect(result).toBe('13');
  });

  it('given two functions, each accepting 2 args (but of different types), should return a function that accepts 3 args & returns the combined result', () => {
    const getArrayItem = (array: readonly string[], index: number): string => array[index] ?? '';
    const toUpperOrLower = (aString: string, toUpper: boolean): string =>
      toUpper ? aString.toUpperCase() : aString.toLowerCase();

    const extendedFn = extendFunction(getArrayItem, toUpperOrLower);

    /* Get the first item from the array and change it to lowercase */
    let result = extendedFn(['A', 'b'], 0, false);
    expect(result).toEqual('a');

    /* Get the second item from the array and change it to uppercase */
    result = extendedFn(['A', 'b'], 1, true);
    expect(result).toEqual('B');
  });

  it('given 3 functions, each accepting 2 args, should return a function that accepts 4 args & returns the combined result', () => {
    const getArrayItem = (array: string[], index: number): string => array[index] ?? '';
    const toUpperOrLower = (aString: string, toUpper: boolean): string =>
      toUpper ? aString.toUpperCase() : aString.toLowerCase();
    const incrementFirstLetter = (aString: string, increment: Integer): string =>
      String.fromCharCode(aString.charCodeAt(0) + increment);

    const extendedFn = extendFunction(getArrayItem, toUpperOrLower, incrementFirstLetter);

    /* Get the first item from the array, change it to lowercase, then get the next Unicode letter */
    let result = extendedFn(['A', 'c'], 0, false, 1);
    expect(result).toEqual('b');

    /* Get the second item from the array, change it to uppercase, then get the previous Unicode letter */
    result = extendedFn(['A', 'c'], 1, true, -1);
    expect(result).toEqual('B');
  });
});
