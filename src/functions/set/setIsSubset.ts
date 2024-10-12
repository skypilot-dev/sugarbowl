/**
 * Returns true if all elements in set A are in set B; otherwise, returns false
 * Source: `skypilot-dev/sugarbowl`
 */
export function setIsSubset<T>(
  childElements: Iterable<T>,
  parentElements: Iterable<T>,
): boolean {
  const childSet = new Set(childElements);
  const parentSet = new Set(parentElements);

  return [...childSet].every((element) => parentSet.has(element));
}
