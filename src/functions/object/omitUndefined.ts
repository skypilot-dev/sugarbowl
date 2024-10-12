/*
  TODO: Optionally, recursively omit nested entries with undefined values.
 */

import type { ConditionalExcept } from 'type-fest';

import { isUndefined } from '~/src/functions/indefinite/index.js';

/**
 * @description Return a copy of the object, omitting keys whose values are undefined
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function omitUndefined<O extends { [key: string]: any }>(obj: O): ConditionalExcept<O, undefined> {
  return Object.entries(obj).reduce((acc, entry) => {
    const [key, value] = entry;
    if (isUndefined(value)) {
      return acc;
    }
    return {
      ...acc,
      [key]: value,
    };
  }, {} as ConditionalExcept<O, undefined>);
}
