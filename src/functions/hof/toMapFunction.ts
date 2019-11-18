/* eslint-disable @typescript-eslint/no-explicit-any */

/* -- Typings -- */
type ItemFn = (item: any) => any;

type MapFn = (array: any[]) => any[];

/* Given a function that acts on a single item, return a function that applies that function to
 * every item in an array. */
export function toMapFunction(itemFn: ItemFn): MapFn {
  return (array) => array.map(itemFn);
}

