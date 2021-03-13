export function getDuplicates<T>(array: ReadonlyArray<T>): T[] {
  const uniqueSet = array
    .filter((item, index, arr) => arr.indexOf(item) !== index)
    .reduce((set, item) => set.add(item), new Set<T>());
  return Array.from(uniqueSet);
}
