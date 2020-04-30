import { MaybeReadOnlyArray } from '@skypilot/common-types';
import { toMutableArray } from './toMutableArray';

/* Given an array, remove any item that is the same as the preceding item and return the result. */
export function omitSequentialDuplicateItems<T>(array: MaybeReadOnlyArray<T>): T[] {
  return toMutableArray(array).reduce((uniqueArray, item) => {
    if (uniqueArray.slice(-1)[0] !== item) {
      uniqueArray.push(item);
    }
    return uniqueArray;
  }, [] as T[])
}
