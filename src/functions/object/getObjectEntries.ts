/*
   Given an object of type `Record<string, any>`, return its entries. This replicates the behaviour of
   `Object.entries` but types the return values correctly.
 */

// TODO: Support the other values accepted by `Object.entries`

type ObjectValues<O> = O extends Record<string, infer Values>
  ? Values
  : never;

// eslint-disable-next-line @typescript-eslint/ban-types
export function getObjectEntries<O extends Object>(
  obj: O
): Array<[key: keyof O, value: ObjectValues<O>]> {
  return Object.entries(obj) as [keyof O, ObjectValues<O>][];
}
