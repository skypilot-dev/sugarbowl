/* Given an array of items, select one item from it at random and return it. */
export function pickRandomItem<T>(array: ReadonlyArray<T>): T {
  if (!array.length) {
    throw new Error('The array is empty');
  }
  return array[Math.floor(Math.random() * array.length)];
}
