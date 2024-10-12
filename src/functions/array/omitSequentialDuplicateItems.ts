/* eslint-disable @typescript-eslint/no-explicit-any */

import { toMutableArray } from '~/src/functions/array/toMutableArray.js';

type Evaluate<I> = (item: I) => any;

interface OmitSequentialDuplicateItemsOptions<I> {
  evaluate?: Evaluate<I>;
}

/* Given an array, remove any item that is the same as the preceding item and return the resultr
   optionally, use a passed function to evaluate each item for purposes of comparison */
export function omitSequentialDuplicateItems<Item>(
  array: ReadonlyArray<Item>,
  options: OmitSequentialDuplicateItemsOptions<Item> = {},
): Item[] {
  const {
    evaluate = (item: Item): Item => item, // default function is the identity function
  } = options;

  let lastEvaluation: any;
  return toMutableArray(array).reduce((uniqueArray, item) => {
    const evaluation = evaluate(item);
    if (evaluation !== lastEvaluation) {
      uniqueArray.push(item);
    }
    lastEvaluation = evaluation;
    return uniqueArray;
  }, [] as Item[]);
}
