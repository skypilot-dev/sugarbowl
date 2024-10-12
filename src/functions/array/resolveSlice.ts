interface ResolvedSlice {
  first: number;
  last: number;
  length: number;
  startAt: number;
  stopBefore: number;
}

/**
 * @description Return an object describing absolute slice coordinates, indices & length
 */
export function resolveSlice<T>(
  slice: ReadonlyArray<number | undefined>,
  items: ReadonlyArray<T>,
): ResolvedSlice | null;
export function resolveSlice(
  slice: ReadonlyArray<number | undefined>,
  arrayLength: number,
): ResolvedSlice | null;
export function resolveSlice<T>(
  slice: ReadonlyArray<number | undefined>,
  arrayOrLength: number | ReadonlyArray<T>,
): ResolvedSlice | null {
  const arrayLength = typeof arrayOrLength === 'number' ? arrayOrLength : arrayOrLength.length;
  const [startAt = 0, stopBefore = arrayLength] = slice;

  function constrainIndexToArraySize(index: number): number {
    if (index <= 0) {
      return 0;
    }
    if (index > arrayLength - 1) {
      return arrayLength - 1;
    }
    return index;
  }

  const absoluteStartAt = startAt >= 0 ? startAt : arrayLength + startAt - 1;
  const absoluteStopBefore = stopBefore >= 0 ? stopBefore : arrayLength + stopBefore;

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
