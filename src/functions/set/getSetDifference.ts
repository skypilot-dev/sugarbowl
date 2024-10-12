/**
 * Returns a new set containing the elements of `minuendElements` that are not in `subtrahendElements`.
 */
export function getSetDifference<T>(
  minuendElements: Iterable<T>,
  subtrahendElements: Iterable<T>,
): Iterable<T> {
  const subtrahendSet = new Set(subtrahendElements);

  return new Set(
    [...minuendElements].filter((element) => !subtrahendSet.has(element)),
  );
}
