/*
  TODO: Improve the return type so that undefined values are excluded
  TODO: Optionally, recursively omit nested entries with undefined values.
 */

import { ConditionalExcept } from 'type-fest';

import { isNull } from '../indefinite';

/**
 * @description Remove entries whose values are null and return as a new object
 */
export function omitNulls<O extends { [key: string]: any }>(obj: O): ConditionalExcept<O, null> {
  return Object.entries(obj).reduce((acc, entry) => {
    const [key, value] = entry;
    if (isNull(value) ) {
      return acc;
    }
    return {
      ...acc,
      [key]: value,
    };
  }, {} as ConditionalExcept<O, null>);
}
