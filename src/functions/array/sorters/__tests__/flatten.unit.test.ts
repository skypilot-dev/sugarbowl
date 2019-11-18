import { flatten } from '../../flatten';

describe('flatten()', () => {
  it('given a nested array, should return an array in which all nested elements have been moved to the first level', () => {
    const initialArray = [[1, 2], 3, 4, 5, [6, [7, 8]]];
    const flattenedArray = flatten(initialArray);
    const expectedArray = [1, 2, 3, 4, 5, 6, 7, 8];

    expect(flattenedArray).toEqual(expectedArray);
  });


  it('given a flat array, should return a clone of it', () => {
    const initialArray = [1, 2, 3];
    const flattenedArray = flatten(initialArray);

    expect(flattenedArray).toEqual(initialArray);
    expect(flattenedArray).not.toBe(initialArray);
  });


  it('given an empty array, should return a new empty array', () => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const initialArray: any[] = [];
    const flattenedArray = flatten(initialArray);

    expect(flattenedArray).toEqual(initialArray);
    expect(flattenedArray).not.toBe(initialArray);
  });


  it('should skip empty subarrays', () => {
    const initialArray = [[], 'a', 'b', [], ['c', [], 'd']];
    const flattenedArray = flatten(initialArray);
    const expectedArray = ['a', 'b', 'c', 'd'];

    expect(flattenedArray).toEqual(expectedArray);
  });


  it('given an array of empty arrays, should return a new empty array', () => {
    const initialArray = [[], [[], []], []];
    const flattenedArray = flatten(initialArray);
    const expectedArray: Array<[]> = [];

    expect(flattenedArray).toEqual(expectedArray);
  });
});
