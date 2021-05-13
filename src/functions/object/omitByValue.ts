// TODO: Optionally, recursively omit nested entries having the value

import { JsonObject } from 'type-fest';

/**
 * @description Remove keys whose values have the given value and return as a new object
 */
export function omitByValue<T extends JsonObject, V>(
  value: V, obj: T
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
