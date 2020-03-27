/* TODO: Recursively omit nested entries with undefined values. */

/* Given an object, return a new object with the same entries minus those with undefined values. */
export function omitUndefinedEntries<T = object, Compacted = Partial<T>>(obj: T): Compacted {
  return Object.entries(obj).reduce((compactedObj, entry) => {
    const [key, value] = entry;
    if (value === undefined) {
      return compactedObj;
    }
    return {
      ...compactedObj,
      [key]: value,
    };
  }, {}) as Compacted;
}
