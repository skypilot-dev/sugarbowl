import { generateRandomInt } from '../generateRandomInt';

describe('generateRandomInt(minValue, maxValue)', () => {
  it('when minValue & maxValue are the same, should return that value', () => {
    const minValue = 2;
    const maxValue = 2;

    const randomInt = generateRandomInt(minValue, maxValue);

    const expected = 2;
    expect(randomInt).toBe(expected);
  });

  it('when maxValue > minValue, should throw an error', () => {
    const minValue = 1;
    const maxValue = 0;

    expect(() => {
      generateRandomInt(minValue, maxValue)
    }).toThrow();
  });

  it('should accept non-integer values but treat them as integers', () => {
    const minValue = 1.001;
    const maxValue = 1.999;

    const randomInt = generateRandomInt(minValue, maxValue);

    const expected = 1;
    expect(randomInt).toBe(expected);
  });
});
