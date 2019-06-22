/* Given a string, remove all non-digits from the string and return the resulting string */

export function digitsOnly(str: string): string {
  return str.replace(/\D/g, '');
}
