/* TODO: Recursively omit nested entries with undefined values. */

import { omitEntriesByValue } from './omitEntriesByValue';

/* Given an object, return a new object with the same entries minus those with undefined values. */
export function omitUndefinedEntries<T = Record<string, unknown>, Compacted = Partial<T>>(obj: T): Compacted {
  return omitEntriesByValue(undefined, obj);
}
