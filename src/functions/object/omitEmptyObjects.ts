import type { EmptyObject } from '@skypilot/common-types';
import type { ConditionalExcept } from 'type-fest';

// TODO: Make this function optionally recursive

/**
 * @description Return a copy of the object, but omit any entries whose values are empty arrays
 */
export function omitEmptyObjects<O extends { [key: string]: any }>(obj: O): ConditionalExcept<O, EmptyObject> {
  return Object.entries(obj).reduce((accObj, [key, value]) => {
    if (
      value instanceof Object &&
      value.constructor === Object &&
      Object.entries(value).length === 0
    ) {
      return accObj;
    }
    return {
      ...accObj,
      [key]: value,
    };
  }, {} as ConditionalExcept<O, EmptyObject>);
}
