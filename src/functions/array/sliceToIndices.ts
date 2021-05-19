import type { Integer } from '@skypilot/common-types';

import { isUndefined } from 'src/functions/indefinite/isUndefined';

/**
 * @description Return the indices of the first & last items of the array range defined by the slice
 */
export function sliceToIndices<T>(
  items: T[], startAt: Integer | undefined, stopBefore: Integer | undefined
): [Integer, Integer] {
  const definiteStartAt = isUndefined(startAt) ? 0 : startAt;
  const definiteStopBefore = isUndefined(stopBefore) ? items.length : stopBefore;

  const indexOfFirstItem = definiteStartAt >= 0
    ? Math.min(definiteStartAt, items.length - 1)
    : Math.max(0, items.length + definiteStartAt);

  const indexOfLastItem = definiteStopBefore >= 0
    ? Math.min(definiteStopBefore - 1, items.length - 1)
    : Math.max(-1, items.length + definiteStopBefore - 1);

  return indexOfLastItem < indexOfFirstItem
    ? [-1, -1]
    : [indexOfFirstItem, indexOfLastItem];
}
