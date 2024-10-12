/* TODO: Recursively omit nested entries with undefined values. */

import { omitEntriesByValue } from '~/src/functions/object/omitEntriesByValue.js';

/**
 * @description Remove keys whose values are undefined and return as a new object
 * @deprecated Use `omitUndefined`
 */
export function omitUndefinedEntries<T = Record<string, unknown>, Compacted = Partial<T>>(obj: T): Compacted {
  return omitEntriesByValue(undefined, obj);
}
