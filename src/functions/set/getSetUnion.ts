export function getSetUnion<T>(...sets: Set<T>[]): Set<T> {
  return sets.reduce((acc, set) => new Set([...acc, ...set]), new Set());
}
