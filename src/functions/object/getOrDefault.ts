/* TODO: FEATURE: Support numeric indices. */
/* TODO: FEATURE: Support object paths. */

/* Given an object, a key, and a default value, return the value mapped to the key or, if the key
 * doesn't exist, the default value. */
export function getOrDefault<V>(obj: { [index: string]: V }, key: string, defaultValue: V): V | undefined {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj[key] as V;
  }
  return defaultValue;
}
