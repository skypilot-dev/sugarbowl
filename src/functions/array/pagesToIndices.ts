import { Integer } from '@skypilot/common-types';
import { omitUndefinedEntries } from '../object';

interface IndexMap {
  endAtIndex: Integer;
  resultsPerPage: Integer;
  startAtIndex: Integer;
  stopBeforeIndex: Integer;
  totalPages?: Integer;
}

/* Given values referencing a page and a number of items per page, return an object representing
   them as indices of an array. */
export function pagesToIndices<T>(
  page: Integer = 1, resultsPerPage?: Integer | undefined, array?: T[]
): IndexMap {
  if (page < 1) {
    throw new Error(`'page' must be >= 1; value received: ${page}`);
  }

  if (page > 1 && resultsPerPage === undefined) {
    throw new Error(
      "A value for 'resultsPerPage' must be given when 'page' > 1;"
    );
  }

  /* For convenience, `resultsPerPage` defaults to the length of the array. */
  const resolvedResultsPerPage = resultsPerPage === undefined
    ? (Array.isArray(array) ? array.length : undefined)
    : resultsPerPage;

  if (!resolvedResultsPerPage || resolvedResultsPerPage < 1) {
    throw new Error(
      `'resultsPerPage' must be >= 1; value received: ${resolvedResultsPerPage}`
    );
  }

  const startAtIndex = (page - 1) * resolvedResultsPerPage;
  const stopBeforeIndex = startAtIndex + resolvedResultsPerPage;
  const endAtIndex = stopBeforeIndex - 1;

  const totalPages = Array.isArray(array)
    ? Math.ceil(array.length / resolvedResultsPerPage)
    : undefined;

  return {
    endAtIndex,
    resultsPerPage: resolvedResultsPerPage,
    startAtIndex,
    stopBeforeIndex,
    ...omitUndefinedEntries<{ totalPages: Integer | undefined }>({ totalPages }),
  };
}
