/* Given an array, recursively move all items from any nested arrays it contains to the parent array */

function flattenArray<T>(array: T[] | T[][], flattenedArray: T[] = []): T[] {
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    if (Array.isArray(value)) {
      flattenArray(value, flattenedArray);
    } else {
      flattenedArray.push(value);
    }
  }
  return flattenedArray;
}

/* We wrap this function around `flattenArray` to hide the second parameter. */
export function flatten<T>(array: T[] | T[][]): T[] {
  return flattenArray(array);
}
