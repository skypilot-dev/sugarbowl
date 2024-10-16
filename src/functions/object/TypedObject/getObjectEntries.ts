/**
 * Given an object of type `Record<string, any>`, return its entries. This replicates the behaviour of
 * `Object.entries` but types the return values correctly.
 */

// TODO: Support the other values accepted by `Object.entries`

type ObjectValues<O> = O extends ReadonlyArray<infer Values> ? Values
  : O extends Array<infer Values> ? Values
  : O extends null ? never
  : O extends Record<string, infer Values> ? Values
  : never;

export function getObjectEntries<T extends number>(obj: T): [];
export function getObjectEntries<T extends string>(obj: T): Array<[key: string, value: string]>;
export function getObjectEntries<T extends Array<Values> | ReadonlyArray<Values>, Values>(
  obj: T,
): Array<[key: string, value: ObjectValues<T>]>;
export function getObjectEntries<T extends object>(
  obj: T,
): Array<[key: keyof T, value: ObjectValues<T>]>;

export function getObjectEntries<T extends object | number | string>(
  obj: T,
):
  | Array<[key: string, value: ObjectValues<T>]>
  | Array<[key: keyof T, value: ObjectValues<T>]>
  | Array<[key: string, value: string]>
  | [] {
  if (typeof obj === 'number') {
    return Object.entries(obj) as [];
  }
  if (typeof obj === 'string') {
    return Object.entries(obj);
  }
  return Array.isArray(obj)
    ? Object.entries(obj) as Array<[string, ObjectValues<T>]>
    : Object.entries(obj) as Array<[keyof T, ObjectValues<T>]>;
}
