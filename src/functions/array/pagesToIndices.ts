import { Integer } from '@skypilot/common-types';
import { omitUndefinedEntries } from '../object';

interface IndexMap {
  endAtIndex: Integer;
  startAtIndex: Integer;
  stopBeforeIndex: Integer;
  totalPages?: Integer;
}

/* Given values referencing a page and a number of items per page, return an object representing
   them as indices of an array. */
export function pagesToIndices<T>(
  page: Integer, resultsPerPage: Integer, array?: T[]
): IndexMap {
  if (resultsPerPage <= 0) {
    throw new Error(`Invalid value for 'resultsPerPage': ${resultsPerPage}`);
  }
  const startAtIndex = (page - 1) * resultsPerPage;
  const stopBeforeIndex = startAtIndex + resultsPerPage;
  const endAtIndex = stopBeforeIndex - 1;

  const totalPages = Array.isArray(array)
    ? Math.ceil(array.length / resultsPerPage)
    : undefined;

  return {
    endAtIndex,
    startAtIndex,
    stopBeforeIndex,
    ...omitUndefinedEntries({ totalPages }),
  };
}
