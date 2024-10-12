/**
 * Returns a set containing the elements that are common to both sets.
 * Source: `skypilot-dev/sugarbowl`
 */
export function setIntersection<T>(aIterable: Iterable<T>, bIterable: Iterable<T>): Set<T> {
  const bSet = new Set(bIterable);
  return new Set([...aIterable].filter(element => bSet.has(element)));
}
