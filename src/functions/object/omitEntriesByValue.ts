/**
 * @description Remove keys whose values are equal to the value and return as a new object
 * @deprecated Use `omitByValue`
 */
export function omitEntriesByValue<T = Record<string, unknown>, Compacted = Partial<T>>(
  value: unknown, obj: T
): Compacted {
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
