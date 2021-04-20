import { objectToMap } from '../objectToMap';

describe('objectToMap', () => {
  it('should convert all object entries to Map entries', () => {
    const dict = { a: 1, b: 2 };
    const expected = new Map([
      ['a', 1], ['b', 2],
    ]);

    const mapped = objectToMap(dict);
    expect(mapped).toStrictEqual(expected);
  });

  it('should convert all array entries to Map entries', () => {
    const array = [1, 2];
    const expected = new Map([
      ['0', 1], ['1', 2],
    ]);

    const mapped = objectToMap(array);
    expect(mapped).toStrictEqual(expected);
  });
});
