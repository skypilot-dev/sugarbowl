import { toMapFunction } from '../toMapFunction';

describe('toMapFunction(:itemFn)', () => {
  it('given a function, return a function that applies the function to every item in an array', () => {
    const toUpperCase = (aString: string): string => aString.toUpperCase();
    const allToUpperCase = toMapFunction(toUpperCase);

    const result = allToUpperCase(['a', 'b']);

    expect(result).toEqual(['A', 'B']);
  });
});
