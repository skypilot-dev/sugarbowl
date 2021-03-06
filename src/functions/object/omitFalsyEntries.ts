import { JsonMap } from '@skypilot/common-types';

/**
 * @description Remove keys whose values are falsy and return as a new object
 * @deprecated Use `omitFalsy`
 */
export function omitFalsyEntries<T = JsonMap, Compacted = Partial<T>>(obj: T): Compacted {
  return Object.entries(obj).reduce((compactedObj, entry) => {
    const [key, value] = entry;
    if (!value) {
      return compactedObj;
    }
    return {
      ...compactedObj,
      [key]: value,
    };
  }, {}) as Compacted;
}
