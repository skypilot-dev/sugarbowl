/*
   Given an object of type `Record<string, any>`, return its values. This replicates the behaviour of
   `Object.entries` but types the return values correctly.
 */

type ObjectValues<O> = O extends ReadonlyArray<infer Values> ? Values
  : O extends Array<infer Values> ? Values
    : O extends null ? never
      : O extends Record<string, infer Values> ? Values
        : never;

export function getObjectValues<T extends number>(num: T): [];
export function getObjectValues<T extends string>(str: T): string[];
export function getObjectValues<T extends object | number | string>(obj: T): ObjectValues<T>[];

export function getObjectValues<T>(obj: T): [] | string[] | ObjectValues<T>[] {
  // @ts-expect-error - Broken by upgrades to TypeScript
  return Object.values(obj);
}
