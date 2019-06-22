/* Given a string, return the string with any whitespace converted to a single space */

export function removeExtraWhitespace(str: string): string {
  return str.replace(/\s+/g,' ');
}
