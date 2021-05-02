import { Integer } from '@skypilot/common-types';

import { TypedObject } from '../object';

/*
    Combines the arrays mapped to an object into an array of objects with the same keys and values.
    For simplicity of typing, currently designed to work only with string values.

    TODO: Modify to allow any values
 */

export function zipToObjects<O extends Record<string, string[]>>(recordMap: O): Record<keyof O, string>[] {
  const keys = TypedObject.keys(recordMap);
  const arrays = TypedObject.values(recordMap);
  const longestArray = arrays.reduce(
    (acc, array) => array.length > acc.length ? array : acc,
    [] as string[]
  );
  return longestArray.map((_item, index) => keys.reduce(
    (acc, key) => ({ ...acc, [key]: itemOrUndefined(recordMap[key], index) }),
    {} as Record<keyof O, string>
  ));
}

function itemOrUndefined<I>(array: I[], index: Integer): I | undefined {
  return array.length > index ? array[index] : undefined;
}
