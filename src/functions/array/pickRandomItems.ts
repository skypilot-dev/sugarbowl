import { Integer } from '@skypilot/common-types';
import { shuffle } from './shuffle';


/* Given an array of items, select the requested number of items at random from the array */
export function pickRandomItems<T>(array: ReadonlyArray<T>, numberOfItems: Integer): T[] {
  if (numberOfItems > array.length) {
    throw new Error(`${numberOfItems} were requested from an array of only ${array.length} items`);
  }

  const shuffledArray = shuffle(array);
  return shuffledArray.slice(0, numberOfItems);
}
