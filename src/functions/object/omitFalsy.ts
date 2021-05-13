/*
  TODO: Improve the return type so that falsy values are excluded
  TODO: Optionally, recursively omit nested entries with falsy values.
 */

/**
 * @description Remove keys whose values are falsy and return as a new object
 */
export function omitFalsy<T extends Record<string, V>, V>(obj: T): Partial<T> {
  return Object.entries(obj).reduce((compactedObj, entry) => {
    const [key, value] = entry;
    if (!value) {
      return compactedObj;
    }
    return {
      ...compactedObj,
      [key]: value,
    };
  }, {} as Partial<T>);
}
