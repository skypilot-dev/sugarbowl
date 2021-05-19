import type { Integer } from '@skypilot/common-types';

import { isUndefined } from 'src/functions/indefinite/isUndefined';

/**
 * @description Return the indices of the first & last items of the array range defined by the slice
 */
export function sliceToIndices<T>(
  items: T[], startAt: Integer | undefined, stopBefore: Integer | undefined
): [Integer, Integer];
export function sliceToIndices(
  arrayLength: Integer, startAt: Integer | undefined, stopBefore: Integer | undefined
): [Integer, Integer];
export function sliceToIndices<T>(
  arrayOrLength: T[] | Integer, startAt: Integer | undefined, stopBefore: Integer | undefined
): [Integer, Integer] {
  const arrayLength = Array.isArray(arrayOrLength) ? arrayOrLength.length : arrayOrLength;
  const definiteStartAt = isUndefined(startAt) ? 0 : startAt;
  const definiteStopBefore = isUndefined(stopBefore) ? arrayLength: stopBefore;

  const indexOfFirstItem = definiteStartAt >= 0
    ? Math.min(definiteStartAt, arrayLength - 1)
    : Math.max(0, arrayLength + definiteStartAt);

  const indexOfLastItem = definiteStopBefore >= 0
    ? Math.min(definiteStopBefore - 1, arrayLength - 1)
    : Math.max(-1, arrayLength + definiteStopBefore - 1);

  return indexOfLastItem < indexOfFirstItem
    ? [-1, -1]
    : [indexOfFirstItem, indexOfLastItem];
}
