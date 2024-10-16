/* Given a string and a substring, return `true` if the string starts with the substring.
 * Note: As currently written, the function always returns `true` if the substring is an empty string.
 */

import type { Integer } from '@skypilot/common-types';

export function startsWith(string: string, substring: string, position: Integer = 0): boolean {
  if (position < 0) {
    throw new Error('position must be >= 0');
  }
  return string.slice(position, position + substring.length) === substring;
}
