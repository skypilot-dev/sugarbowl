/* Given a string, remove all digits from the string and return the resulting string */

export function nondigitsOnly(str: string): string {
  return str.replace(/\d/g, '');
}
