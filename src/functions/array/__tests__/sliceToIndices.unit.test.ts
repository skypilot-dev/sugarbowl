import { sliceToIndices } from '../sliceToIndices';

describe('sliceToIndices()', () => {
  it('should compute start and stop indices based on startAt & stopBefore', () => {
    const items = [1, 2, 3];
    {
      const [startAt, stopBefore] = [0, 3];
      const expected = [0, 2];

      const arrayActual = sliceToIndices(items, startAt, stopBefore);
      const lengthActual = sliceToIndices(3, startAt, stopBefore);
      expect(arrayActual).toStrictEqual(expected);
      expect(lengthActual).toStrictEqual(expected);
    }
    {
      const [startAt, stopBefore] = [2, 3];
      const expected = [2, 2];

      const actual = sliceToIndices(items, startAt, stopBefore);
      expect(actual).toStrictEqual(expected);
    }
  });

  it('should constrain startIndex to no less than zero', () => {
    const items = [1, 2, 3];
    const [startAt, stopBefore] = [-4, 3];
    const expected = [0, 2];

    const actual = sliceToIndices(items, startAt, stopBefore);
    expect(actual).toStrictEqual(expected);
  });

  it('should constrain stopIndex to the index of the last item', () => {
    const items = [1, 2, 3];
    const [startAt, stopBefore] = [1, 4];
    const expected = [1, 2];

    const actual = sliceToIndices(items, startAt, stopBefore);
    expect(actual).toStrictEqual(expected);
  });

  it('startIndex should never be less than the index of the first item', () => {
    const items = [1, 2, 3];
    {
      const [startAt, stopBefore] = [-5, 2];
      const expected = [0, 1];

      const actual = sliceToIndices(items, startAt, stopBefore);
      expect(actual).toStrictEqual(expected);
    }
  });

  it('stopIndex should never be greater than the index of the last item', () => {
    const items = [1, 2, 3];
    const [startAt, stopBefore] = [0, 5];
    const expected = [0, 2];

    const actual = sliceToIndices(items, startAt, stopBefore);
    expect(actual).toStrictEqual(expected);
  });

  it('given undefined startAt, should return a startIndex of 0', () => {
    const items = [1, 2, 3];
    const [startAt, stopBefore] = [undefined, 3];
    const expected = [0, 2];

    const actual = sliceToIndices(items, startAt, stopBefore);
    expect(actual).toStrictEqual(expected);
  });

  it('given undefined stopBefore, should set it to the index of the last item', () => {
    const items = [1, 2, 3];
    const [startAt, stopBefore] = [1, undefined];
    const expected = [1, 2];

    const actual = sliceToIndices(items, startAt, stopBefore);
    expect(actual).toStrictEqual(expected);
  });

  it('given undefined startAt & stopBefore, should set them to [0, array length - 1] (the entire array)', () => {
    const items = [1, 2, 3];
    const [startAt, stopBefore] = [undefined, undefined];
    const expected = [0, 2];

    const actual = sliceToIndices(items, startAt, stopBefore);
    expect(actual).toStrictEqual(expected);
  });

  it('should constrain negative values to the size of the array', () => {
    const items = [1, 2, 3];
    {
      const [startAt, stopBefore] = [-5, -1];
      const expected = [0, 1];

      const actual = sliceToIndices(items, startAt, stopBefore);
      expect(actual).toStrictEqual(expected);
    }
    {
      const [startAt, stopBefore] = [2, -5];
      const expected = [-1, -1];

      const actual = sliceToIndices(items, startAt, stopBefore);
      expect(actual).toStrictEqual(expected);
    }
  });

  it('if startAt references an index higher than the index of the last item, should return [-1, -1]', () => {
    const items = [1, 2, 3];
    const [startAt, stopBefore] = [3, 4];
    const expected = [-1, -1];

    const actual = sliceToIndices(items, startAt, stopBefore);
    expect(actual).toStrictEqual(expected);
  });

  it('if startAt references an index >= stopBefore, should return [-1, -1]', () => {
    const items = [1, 2, 3];
    const [startAt, stopBefore] = [2, -3];
    const expected = [-1, -1];

    const actual = sliceToIndices(items, startAt, stopBefore);
    expect(actual).toStrictEqual(expected);
  });

  it('given an empty array, should always return [-1, -1]', () => {
    const items: number[] = [];
    const expected = [-1, -1];

    const startAtValues = [-1, undefined, 0, 1];
    const stopBeforeValues = [-1, undefined, 0, 1];
    for (const startAt of startAtValues) {
      for (const stopBefore of stopBeforeValues) {
        const actual = sliceToIndices(items, startAt, stopBefore);
        expect(actual).toStrictEqual(expected);
      }
    }
  });
});
