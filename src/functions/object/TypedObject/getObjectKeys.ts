/*
   Given an object or array, return its keys. This replicates the behaviour of `Object.keys` but types the
   return values correctly.
 */

// TODO: Consider returning Array<IntegerString> instead
// TODO: Support the other values accepted by `Object.keys`


export function getObjectKeys<T extends Array<unknown> | ReadonlyArray<unknown> | string>(array: T): Array<string>;
export function getObjectKeys<T extends number>(num: T): [];
export function getObjectKeys<T extends Record<string, unknown>>(obj: T): Array<keyof T>;
export function getObjectKeys<T>(obj: T): Array<string> | Array<keyof T>  {
  return Object.keys(obj) as (keyof T)[];
}
