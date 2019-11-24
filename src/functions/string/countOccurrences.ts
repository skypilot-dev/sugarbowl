import { Integer } from '@skypilot/common-types';

/* Count the number of times a substring occurs in a string and return the number. */
export function countOccurrences(str: string, substring: string): Integer {
  if (!substring) {
    return NaN;
  }
  return str.split(substring).length - 1;
}
