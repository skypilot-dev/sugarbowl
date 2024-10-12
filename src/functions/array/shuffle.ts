/* Given an items, create a new array comprising the same items, then shuffle the new array and
  return it. */

import { assertIsDefined } from '~/src/functions/indefinite/isDefined.js';

export function shuffle<T>(array: ReadonlyArray<T>): T[] {
  const shuffledArray = [...array]; // Create a shallow copy
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    // Use the intermediate variables to handle possible undefined values more safely.
    const swap1 = shuffledArray[i];
    const swap2 = shuffledArray[j];
    assertIsDefined(swap1);
    assertIsDefined(swap2);
    shuffledArray[i] = swap2;
    shuffledArray[j] = swap1;
  }
  return shuffledArray;
}
