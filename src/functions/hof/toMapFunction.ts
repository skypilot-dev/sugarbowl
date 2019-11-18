/* eslint-disable @typescript-eslint/no-explicit-any */

/* -- Typings -- */
import { extendFunction } from './extendFunction';

type ItemFn = (...args: any[]) => any;

type MapFn = (array: any[], ...args: any[]) => any[];


/* Given a function that acts on a single item, return a function that applies that function to
 * every item in an array. */
export function doToMapFunction(itemFn: ItemFn): MapFn {
  return (array, ...args: any[]) => array.map((item) => itemFn(item, ...args));
}


export function toMapFunction(...itemFns: ItemFn[]): MapFn {
  const [firstItemFn, ...extendingItemFns] = itemFns;
  const extendedItemFn = extendFunction(firstItemFn, ...extendingItemFns) as ItemFn;

  return doToMapFunction(extendedItemFn);
}
