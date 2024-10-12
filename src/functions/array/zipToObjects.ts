import { isUndefined, TypedObject } from 'src/functions/index.js';

interface ZipToObjectsOptions {
  omitUndefined?: boolean;
}

/*
    Combines the arrays mapped to an object into an array of objects with the same keys and values.
    For simplicity of typing, currently designed to work only with string values.

    TODO: Modify to allow any values
 */
export function zipToObjects<O extends Record<string, string[]>>(
  recordMap: O,
  options: ZipToObjectsOptions = {},
): Record<keyof O, string>[] {
  const { omitUndefined = false } = options;

  const keys = TypedObject.keys(recordMap);
  const arrays = TypedObject.values(recordMap);
  const longestArray = arrays.reduce(
    (acc, array) => array.length > acc.length ? array : acc,
    [] as string[],
  );
  return longestArray.map((_item, index) =>
    keys.reduce((acc, key) => {
      const value = itemOrUndefined(recordMap[key] ?? [], index);
      return (omitUndefined && isUndefined(value))
        ? acc
        : { ...acc, [key]: itemOrUndefined(recordMap[key] ?? [], index) };
    }, {} as Record<keyof O, string>)
  );
}

function itemOrUndefined<I>(array: I[], index: number): I | undefined {
  return array.length > index ? array[index] : undefined;
}
