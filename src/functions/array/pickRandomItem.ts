import { MaybeReadOnlyArray } from '@skypilot/common-types';
import { pickRandomItems } from './pickRandomItems';

/* Given an array of items, select one item from it at random and return it. */
export function pickRandomItem<T>(array: MaybeReadOnlyArray<T>): T {
  return pickRandomItems<T>(array, 1)[0];
}
