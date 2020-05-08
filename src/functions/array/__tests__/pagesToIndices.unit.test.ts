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
      resultsPerPage: 2,
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
      }).toThrow("'resultsPerPage' must be >= 1");
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
      resultsPerPage: 2,
      totalPages: 3,
    };
    expect(indexMap).toEqual(expected);

    const { startAtIndex, endAtIndex, stopBeforeIndex } = expected;
    expect(array[endAtIndex]).toBe(4);
    expect(array.slice(startAtIndex, stopBeforeIndex)).toEqual([3, 4]);
  });

  it('when `page` > 1 and `resultsPerPage` is undefined, should throw an error', () => {
    const page = 1;

    expect(() => {
      pagesToIndices(page);
    }).toThrow();
  });

  it('when `page` > 1 and `resultsPerPage` is undefined, should throw an error when an array is passed', () => {
    const page = 2;
    const resultsPerPage = undefined;
    const array = [1];

    expect(() => {
      pagesToIndices(page, resultsPerPage, array);
    }).toThrow();
  });

  it('when an array is passed, `resultsPerPage` should default to the length of the array', () => {
    const page = 1;
    const array = [1, 2, 3, 4, 5];

    const indexMap = pagesToIndices(page, undefined, array);

    const expected = {
      startAtIndex: 0,
      endAtIndex: 4,
      stopBeforeIndex: 5,
      resultsPerPage: 5,
      totalPages: 1,
    };
    expect(indexMap).toEqual(expected);
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
      resultsPerPage: 2,
    };
    expect(indexMap).toEqual(expected);

    const { startAtIndex, endAtIndex, stopBeforeIndex } = expected;
    expect(array[endAtIndex]).toBeUndefined();
    expect(array.slice(startAtIndex, stopBeforeIndex)).toEqual([]);
  });
});
