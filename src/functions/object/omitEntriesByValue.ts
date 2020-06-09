/* Given an object, return a new object with the same entries minus those with the value */
/* TODO: Recursively omit nested entries having the value. */
export function omitEntriesByValue<T = Record<string, unknown>, Compacted = Partial<T>>(value: unknown, obj: T): Compacted {
  return Object.entries(obj).reduce((compactedObj, entry) => {
    const [key, entryValue] = entry;
    if (entryValue === value) {
      return compactedObj;
    }
    return {
      ...compactedObj,
      [key]: entryValue,
    };
  }, {}) as Compacted;
}
