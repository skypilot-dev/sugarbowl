import { toMapFunction } from '../toMapFunction';

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
    const omitLetter = (aString: string): string => aString.replace('B', '');

    const mapFn = toMapFunction(trim, toUpperCase, omitLetter);

    const result = mapFn([' abc', 'bcd ']);

    expect(result).toEqual(['AC', 'CD']);
  });
});
