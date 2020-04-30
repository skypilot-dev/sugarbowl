/* Given an items, create a new array comprising the same items, then shuffle the new array and
  return it. */
import { MaybeReadOnlyArray } from '@skypilot/common-types';

export function shuffle<T>(array: MaybeReadOnlyArray<T>): T[] {
  let store;
  const shuffledArray = Array.from(array);
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    store = shuffledArray[i];
    shuffledArray[i] = shuffledArray[j];
    shuffledArray[j] = store;
  }
  return shuffledArray;
}
