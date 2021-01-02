import { isEnclosed } from './isEnclosed';

export function parseEnclosed(
  stringToParse: string, startDelimiter: string, endDelimiter: string = startDelimiter
): string {
  if (!isEnclosed(stringToParse, startDelimiter, endDelimiter)) {
    throw new Error(`The string is not properly delimited: ${stringToParse}`);
  }
  return stringToParse.slice(startDelimiter.length, stringToParse.length - endDelimiter.length);
}
