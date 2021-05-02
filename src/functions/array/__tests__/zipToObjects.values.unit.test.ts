import { Integer } from '@skypilot/common-types';

import { zipToObjects } from '../zipToObjects';

describe('zipToObjects', () => {
  it("should combine the arrays in the object's values", () => {
    const recordMap = {
      cardinal: ['one', 'two'],
      ordinal: ['first', 'second'],
    };
    const expected = [
      { cardinal: 'one', ordinal: 'first' },
      { cardinal: 'two', ordinal: 'second' },
    ];

    const actual = zipToObjects(recordMap);
    expect(actual).toStrictEqual(expected);
  });

  it('if an array is shorter than the longest array, missing values should be undefined', () => {
    const recordMap = {
      a: ['1', '2'],
      b: ['3'],
    };
    const expected = [
      { a: '1', b: '3' },
      { a: '2', b: undefined },
    ];

    const actual = zipToObjects(recordMap);
    expect(actual).toStrictEqual(expected);
  });

  it('given only empty arrays, should return an empty array', () => {
    const recordMap = {
      a: [],
      b: [],
    };
    const expected: { a: Integer | undefined; b: Integer | undefined }[] = [];

    const actual = zipToObjects(recordMap);
    expect(actual).toStrictEqual(expected);
  });
});
