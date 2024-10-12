/*
  TODO: Improve the return type so that falsy values are excluded
  TODO: Optionally, recursively omit nested entries with falsy values.
 */

import type { Falsy } from '@skypilot/common-types';
import type { ConditionalExcept } from 'type-fest';

type NoFalsy<T> = ConditionalExcept<T, Falsy>;

/**
 * @description Remove keys whose values are falsy and return as a new object
 */
export function omitFalsy<T extends { [key: string]: any }>(obj: T): NoFalsy<T> {
  return Object.entries(obj).reduce((compactedObj, entry) => {
    const [key, value] = entry;
    if (!value) {
      return compactedObj;
    }
    return {
      ...compactedObj,
      [key]: value,
    };
  }, {} as NoFalsy<T>);
}
