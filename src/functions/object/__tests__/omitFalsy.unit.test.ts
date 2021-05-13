import { omitFalsy } from '../omitFalsy';

describe('omitFalsy(:object)', () => {
  it('given an object, should return a new object having only the truthy values of the original', () => {
    const originalObj = { a: 1, b: null, c: undefined, d: 0, e: '' };

    const noFalsy = omitFalsy(originalObj);

    const expectedObj = { a: 1 };
    expect(noFalsy).toStrictEqual(expectedObj);
    expect(noFalsy).not.toHaveProperty('b');
  });

  it('given an object with all truthy values, should return an equal but not identical object', () => {
    const originalObj = { a: 1, b: 2 };

    const noFalsy = omitFalsy(originalObj);

    expect(noFalsy).toEqual(originalObj);
    expect(noFalsy).not.toBe(originalObj);
  });

  it('given an object with no truthy values, should return an empty object', () => {
    const originalObj = { a: undefined, b: 0, c: '', d: null };

    const noFalsy = omitFalsy(originalObj);

    const expectedObj = {};
    expect(noFalsy).toStrictEqual(expectedObj);
    expect(noFalsy).not.toHaveProperty('a');
  });

  it('given an empty object, should return a non-identical empty object', () => {
    const originalObj = {};

    const noFalsy = omitFalsy(originalObj);

    const expectedObj = {};
    expect(noFalsy).toStrictEqual(expectedObj);
    expect(noFalsy).not.toBe(originalObj);
  });
});
