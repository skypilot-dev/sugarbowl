import { omitIndefinite } from '../omitIndefinite';

describe('omitIndefinite(:object)', () => {
  it('given an object, should return a new object having only the definite values of the original', () => {
    const originalObj = { a: 1, b: undefined, c: null };

    const noIndefinite = omitIndefinite(originalObj);

    const expectedObj = { a: 1 };
    expect(noIndefinite).toStrictEqual(expectedObj);
  });

  it('given an object with all definite values, should return an equal but not identical object', () => {
    const originalObj = { a: 1, b: () => true, c: 0 };

    const noIndefinite = omitIndefinite(originalObj);

    expect(noIndefinite).toEqual(originalObj);
    expect(noIndefinite).not.toBe(originalObj);
  });

  it('given an object with no definite values, should return an empty object', () => {
    const originalObj = { a: undefined, b: null };

    const noIndefinite = omitIndefinite(originalObj);

    const expectedObj = {};
    expect(noIndefinite).toStrictEqual(expectedObj);
    expect(noIndefinite).not.toHaveProperty('a');
  });

  it('given an empty object, should return a non-identical empty object', () => {
    const originalObj = {};

    const noIndefinite = omitIndefinite(originalObj);

    const expectedObj = {};
    expect(noIndefinite).toStrictEqual(expectedObj);
    expect(noIndefinite).not.toBe(originalObj);
  });

  it('should retain falsy values and empty objects & arrays', () => {
    const originalObj = { a: false, b: 0, c: '', d: [], e: {} };

    const noIndefinite = omitIndefinite(originalObj);

    expect(noIndefinite).toStrictEqual(originalObj);
  });
});
