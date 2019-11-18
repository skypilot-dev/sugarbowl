/* eslint-disable @typescript-eslint/no-explicit-any */
import { extendFunction } from './extendFunction';


/* -- Typings -- */
type ItemFn = (item: any) => any;

type MapFn = (array: any[]) => any[];


/* Given a function that acts on a single item, return a function that applies that function to
 * every item in an array. */
export function doToMapFunction(itemFn: ItemFn): MapFn {
  return (array) => array.map(itemFn);
}


export function toMapFunction(...itemFns: ItemFn[]): MapFn {
  const [firstItemFn, ...extendingItemFns] = itemFns;
  const extendedItemFn = extendFunction(firstItemFn, ...extendingItemFns) as ItemFn;
  return doToMapFunction(extendedItemFn);
}
