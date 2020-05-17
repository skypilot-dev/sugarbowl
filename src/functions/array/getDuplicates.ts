import { MaybeReadOnlyArray } from '@skypilot/common-types';

export function getDuplicates<T>(array: MaybeReadOnlyArray<T>): T[] {
  const uniqueSet = array
    .filter((item, index, arr) => arr.indexOf(item) !== index)
    .reduce((set, item) => set.add(item), new Set<T>());
  return Array.from(uniqueSet);
}
