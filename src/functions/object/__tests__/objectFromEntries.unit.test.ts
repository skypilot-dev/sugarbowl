import { objectFromEntries } from '../objectFromEntries';

describe('objectFromEntries(entries)', () => {
  it('should create an object from the entries and return it', () => {
    const entries: Iterable<readonly [string, number]> = [
      ['a', 1],
      ['b', 2],
    ] as const;

    const obj = objectFromEntries(entries);

    const expected = { a: 1, b: 2 };
    expect(obj).toStrictEqual(expected);
  });

  it('can use numbers as keys', () => {
    const entries: Iterable<readonly [number, string]> = [
      [1, 'a'],
      [2, 'b'],
    ] as const;

    const obj = objectFromEntries(entries);

    const expected = { '1': 'a', '2': 'b' };
    expect(obj).toStrictEqual(expected);
  });

  it('can use symbols as keys', () => {
    const entries: Iterable<readonly [symbol, number]> = [
      [Symbol.for('1'), 1],
      [Symbol.for('2'), 2],
    ] as const;

    const obj = objectFromEntries(entries);

    const expected = { [Symbol.for('1')]: 1, [Symbol.for('2')]: 2 };
    expect(obj).toStrictEqual(expected);
  });
});
