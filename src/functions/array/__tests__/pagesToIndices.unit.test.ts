import { pagesToIndices } from '../pagesToIndices';


describe('pagesToIndices()', () => {
  it('given a page and results per page, should return indices for slicing the array', () => {
    const page = 1;
    const resultsPerPage = 2;

    const indexMap = pagesToIndices(page, resultsPerPage);

    const expected = {
      startAtIndex: 0,
      endAtIndex: 1,
      stopBeforeIndex: 2,
    };
    expect(indexMap).toEqual(expected);
  });

  it('given a `resultsPerPage` <= 0, should throw an error', () => {
    const page = 1;
    const badResultsPerPage = [-1, 0];

    expect.assertions(2);
    badResultsPerPage.forEach(resultsPerPage => {
      expect(() => {
        pagesToIndices(page, resultsPerPage);
      }).toThrow('Invalid value');
    });
  });

  it('when passed an array, should also return the number of pages in the array', () => {
    const page = 2;
    const resultsPerPage = 2;
    const array = [1, 2, 3, 4, 5];

    const indexMap = pagesToIndices(page, resultsPerPage, array);

    const expected = {
      startAtIndex: 2,
      endAtIndex: 3,
      stopBeforeIndex: 4,
      totalPages: 3,
    };
    expect(indexMap).toEqual(expected);

    const { startAtIndex, endAtIndex, stopBeforeIndex } = expected;
    expect(array[endAtIndex]).toBe(4);
    expect(array.slice(startAtIndex, stopBeforeIndex)).toEqual([3, 4]);
  });

  it('can accept an array shorter than the number of pages indicated by the pagination', () => {
    const page = 4; // 4th page is requested
    const resultsPerPage = 2;
    const array = [1, 2, 3, 4, 5];

    const indexMap = pagesToIndices(page, resultsPerPage, array);

    const expected = {
      startAtIndex: 6,
      endAtIndex: 7,
      stopBeforeIndex: 8,
      totalPages: 3, // is less than 4 pages
    };
    expect(indexMap).toEqual(expected);

    const { startAtIndex, endAtIndex, stopBeforeIndex } = expected;
    expect(array[endAtIndex]).toBeUndefined();
    expect(array.slice(startAtIndex, stopBeforeIndex)).toEqual([]);
  });
});
