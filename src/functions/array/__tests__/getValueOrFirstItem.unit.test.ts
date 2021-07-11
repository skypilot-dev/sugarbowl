import { getValueOrFirstItem } from '../getValueOrFirstItem';

describe('getValueOrFirstItem', () => {
  it('if the value is an array, should return the first item', () => {
    const value = ['a', 'b'];
    const expected = 'a';

    const actual = getValueOrFirstItem(value);
    expect(actual).toBe(expected);
  });

  it('if the array is not empty should ignore the defaultValue', () => {
    const value = ['a', 'b'];
    const defaultValue = 'default';
    const expected = 'a';

    const actual = getValueOrFirstItem(value, defaultValue);
    expect(actual).toBe(expected);
  });

  it('if the array is empty and a defaultValue is given, should return the default value', () => {
    const value: string[] = [];
    const defaultValue = 'default';
    const expected = defaultValue;

    const actual = getValueOrFirstItem(value, defaultValue);
    expect(actual).toBe(expected);
  });

  it('if the array is empty and no defaultValue is given, should return undefined', () => {
    const value: string[] = [];

    const actual = getValueOrFirstItem(value);
    expect(actual).toBeUndefined();
  });

  it('if the value is not an array, should return the value', () => {
    const value = 'a';
    const expected = 'a';

    const actual = getValueOrFirstItem(value);
    expect(actual).toBe(expected);
  });

  it('if the value is falsy and a defaultValue is given, should return the defaultValue', () => {
    const value = '';
    const defaultValue = 'default';
    const expected = defaultValue;

    const actual = getValueOrFirstItem(value, defaultValue);
    expect(actual).toBe(expected);
  });

  it('if the value is falsy and no defaultValue is given, should return the value', () => {
    const value = '';
    const expected = value;

    const actual = getValueOrFirstItem(value);
    expect(actual).toBe(expected);
  });

  it('if the value is falsy and no defaultValue is given, should return the value', () => {
    const value = ((): string | string[] => 'a')();
    const expected = 'a';

    const actual = getValueOrFirstItem(value);
    expect(actual).toBe(expected);
  });
});
