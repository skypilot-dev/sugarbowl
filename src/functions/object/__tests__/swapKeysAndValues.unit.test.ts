import { swapKeysAndValues } from '../swapKeysAndValues';

describe('swapKeysAndValues(:object)', () => {
  it('can swap string keys with string values', () => {
    const obj = { aKey: 'a-value', 'b-key': 'bValue' };

    const expectedSwappedObj = { 'a-value': 'aKey', bValue: 'b-key' };
    const actualSwappedObj = swapKeysAndValues(obj);
    expect(actualSwappedObj).toEqual(expectedSwappedObj);
  });

  it('can swap string keys with number values', () => {
    const obj = { a: 1, b: -1.5 };

    const expectedSwappedObj = { '1': 'a', '-1.5': 'b' };
    const actualSwappedObj = swapKeysAndValues(obj);
    expect(actualSwappedObj).toEqual(expectedSwappedObj);
  });

  it("can't swap an object with non-unique values", () => {
    const obj = { a: 'duplicate value', b: 'duplicate value' };

    expect(() => {
      swapKeysAndValues(obj);
    }).toThrow();
  });
});
