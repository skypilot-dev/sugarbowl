/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type Dict<Value = any> = Record<string, Value>;

// TODO: Make this function optionally recursive

// NOTE: Taken from `measurement-api` repo

/* Given an object, return a new object without any entries whose values are empty arrays */
export function omitEmptyArrays<O extends Dict>(obj: O): Partial<O> {
  return Object.entries(obj).reduce((accObj, [key, value]) => {
    if (Array.isArray(value) && !value.length) {
      return accObj;
    }
    return {
      ...accObj,
      [key]: value,
    };
  }, {} as Partial<O>);
}
