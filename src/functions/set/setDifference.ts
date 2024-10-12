/**
 * Returns the difference of the two sets: set A minus set B.
 * Source: `skypilot-dev/sugarbowl`
 */
export function setDifference<T>(
  minuendElements: Iterable<T>, subtrahendElements: Iterable<T>
): Set<T> {
  const subtrahendSet = new Set(subtrahendElements);
  return new Set(
    [...minuendElements].filter(element => !subtrahendSet.has(element))
  );
}
