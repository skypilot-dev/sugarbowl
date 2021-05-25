/*
  TODO: Improve the return type so that undefined values are excluded
  TODO: Optionally, recursively omit nested entries with undefined values.
 */

import { ConditionalExcept } from 'type-fest';

import { isUndefined } from '../indefinite';

/**
 * @description Remove keys whose values have the given value and return as a new object
 */
export function omitUndefined<O extends { [key: string]: any }>(obj: O): ConditionalExcept<O, undefined> {
  return Object.entries(obj).reduce((acc, entry) => {
    const [key, value] = entry;
    if (isUndefined(value) ) {
      return acc;
    }
    return {
      ...acc,
      [key]: value,
    };
  }, {} as ConditionalExcept<O, undefined>);
}
