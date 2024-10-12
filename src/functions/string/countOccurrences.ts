/* Count the number of times a substring occurs in a string and return the number. */
export function countOccurrences(str: string, substring: string): number {
  if (!substring) {
    return 0;
  }
  return str.split(substring).length - 1;
}
