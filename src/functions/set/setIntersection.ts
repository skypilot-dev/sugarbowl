/**
 * Returns a set containing the elements that are common to both sets.
 * Source: `skypilot-dev/sugarbowl`
 */
export function setIntersection<T>(aSet: Set<T>, bSet: Set<T>): Set<T> {
  return new Set([...aSet].filter(element => bSet.has(element)));
}
