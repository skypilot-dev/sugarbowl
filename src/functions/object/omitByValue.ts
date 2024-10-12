// TODO: Optionally, recursively omit nested entries having the value

/**
 * @description Remove keys whose values have the given value and return as a new object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function omitByValue<T extends { [key: string]: any }, V>(
  value: V,
  obj: T,
): Partial<T> {
  return Object.entries(obj).reduce((compactedObj, entry) => {
    const [key, entryValue] = entry;
    if (entryValue === value) {
      return compactedObj;
    }
    return {
      ...compactedObj,
      [key]: entryValue,
    };
  }, {} as Partial<T>);
}
