/*
  TODO: Optionally, recursively omit nested entries with undefined values.
 */

import type { ConditionalExcept } from 'type-fest';

import { isNull } from '~/src/functions/indefinite/index.js';

/**
 * @description Remove entries whose values are null and return as a new object
 */
export function omitNulls<O extends { [key: string]: unknown }>(obj: O): ConditionalExcept<O, null> {
  return Object.entries(obj).reduce((acc, entry) => {
    const [key, value] = entry;
    if (isNull(value)) {
      return acc;
    }
    return {
      ...acc,
      [key]: value,
    };
  }, {} as ConditionalExcept<O, null>);
}
