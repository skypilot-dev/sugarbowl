import type { ConditionalExcept } from 'type-fest';

// TODO: Make this function optionally recursive

/* Given an object, return a new object without any entries whose values are empty arrays */
export function omitEmptyArrays<O extends { [key: string]: unknown }>(obj: O): ConditionalExcept<O, []> {
  return Object.entries(obj).reduce((accObj, [key, value]) => {
    if (Array.isArray(value) && !value.length) {
      return accObj;
    }
    return {
      ...accObj,
      [key]: value,
    };
  }, {} as ConditionalExcept<O, []>);
}
