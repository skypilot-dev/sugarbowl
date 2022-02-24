import type { EmptyObject } from '@skypilot/common-types';

// TODO: Make this function optionally recursive

function isEmptyObject<T>(value: T | EmptyObject): value is EmptyObject {
  return value instanceof Object
    && value.constructor === Object
    && Object.entries(value).length === 0
}

// TODO: Ideally, determine the type mapped to each property; make partial any that accept objects
// that could be empty

/**
 * @description Return a copy of the object, but omit any entries whose values are empty arrays
 */
export function omitEmptyObjects<O extends { [key: string]: any }>(obj: O): Partial<O> {
  const filteredEntries = Object.entries(obj)
    .filter(value => !isEmptyObject(value));

  return Object.fromEntries(filteredEntries) as Partial<O>;
}
