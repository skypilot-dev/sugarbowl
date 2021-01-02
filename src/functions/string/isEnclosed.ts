/* Return true if the string is enclosed by the specified terminators; otherwise, return false.
 * If only one delimiter is specified, use it for both start and end delimiters. */
export function isEnclosed(str: string, startDelimiter: string, endDelimiter: string = startDelimiter): boolean {
  if (!startDelimiter || !endDelimiter) {
    throw new Error('Delimiters must not be empty values.');
  }
  return str.slice(0, 1) === startDelimiter && str.slice(-1) === endDelimiter;
}
