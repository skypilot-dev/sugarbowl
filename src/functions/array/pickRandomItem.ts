/* Given an array of items, select one item from it at random and return it. */
export function pickRandomItem<T>(array: ReadonlyArray<T>): T {
  const pickedItem = array[Math.floor(Math.random() * array.length)];
  if (!pickedItem) {
    throw new Error('The array is empty');
  }
  return pickedItem;
}
