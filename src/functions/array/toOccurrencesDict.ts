export function countOccurrences(items: string[]): any {
  return items.reduce((acc, item) => acc[item]
    ? { ...acc[item], [item]: acc[item] + 1 }
    : { ...acc, [item]: 1 }
    , {});
}
