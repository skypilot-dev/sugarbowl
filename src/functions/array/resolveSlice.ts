import type { Integer } from '@skypilot/common-types';

import { isUndefined } from 'src/functions/indefinite/isUndefined';

interface ResolvedSlice {
  first: Integer;
  last: Integer;
  length: Integer;
  startAt: Integer;
  stopBefore: Integer;
}

/**
 * @description Return an object describing absolute slice coordinates, indices & length
 */
export function resolveSlice<T>(
  slice: ReadonlyArray<Integer | undefined>, items: ReadonlyArray<T>
): ResolvedSlice | null;
export function resolveSlice(
  slice: ReadonlyArray<Integer | undefined>, arrayLength: Integer
): ResolvedSlice | null;
export function resolveSlice<T>(
  slice: ReadonlyArray<Integer | undefined>, arrayOrLength: Integer | ReadonlyArray<T>
): ResolvedSlice | null {
  const arrayLength = arrayOrLength instanceof Array ? arrayOrLength.length : arrayOrLength;
  const [startAt, stopBefore] = slice;

  const definiteStartAt = isUndefined(startAt) ? 0 : startAt;
  const definiteStopBefore = isUndefined(stopBefore) ? arrayLength: stopBefore;

  function constrainIndexToArraySize(index: Integer): Integer {
    if (index <= 0) {
      return 0;
    }
    if (index > arrayLength - 1) {
      return arrayLength - 1;
    }
    return index;
  }

  const absoluteStartAt = definiteStartAt >= 0 ? definiteStartAt : arrayLength + definiteStartAt - 1;
  const absoluteStopBefore = definiteStopBefore >= 0 ? definiteStopBefore : arrayLength + definiteStopBefore;

  const indexOfFirstItem = constrainIndexToArraySize(absoluteStartAt);
  const indexOfLastItem = constrainIndexToArraySize(absoluteStopBefore - 1);
  const resolvedLength = indexOfLastItem - indexOfFirstItem + 1;

  return (
    arrayLength === 0 || resolvedLength < 1 || absoluteStartAt >= arrayLength || absoluteStartAt >= absoluteStopBefore
  )
    ? null
    : {
      first: indexOfFirstItem,
      last: indexOfLastItem,
      length: indexOfLastItem - indexOfFirstItem + 1,
      startAt: indexOfFirstItem,
      stopBefore: indexOfLastItem + 1,
    };
}
