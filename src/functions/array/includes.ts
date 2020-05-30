// Type-safe version of `Array.prototype.includes`
export function includes<T, U extends T>(array: readonly U[], item: T): item is U {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  return array.includes(item as any);
}
