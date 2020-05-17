/* TODO: Recursively omit nested entries having the value. */

/* Given an object, return a new object with the same entries minus those with the value */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function omitEntriesByValue<T = object, Compacted = Partial<T>>(value: any, obj: T): Compacted {
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
