/* These functions are simply wrapper for the `String.prototype` methods of the same name */

import { Integer } from '@skypilot/common-types';


export function padEnd(str: string, targetLength: Integer, padString = ' '): string {
  return str.padEnd(targetLength, padString);
}


export function padStart(str: string, targetLength: Integer, padString = ' '): string {
  return str.padStart(targetLength, padString);
}


export function toLowerCase(str: string): string {
  /* If the string is empty (or falsy), return it unchanged */
  if (!str) {
    return str;
  }
  return str.toLowerCase();
}


export function toUpperCase(str: string): string {
  /* If the string is empty (or falsy), return it unchanged */
  if (!str) {
    return str;
  }
  return str.toUpperCase();
}


export function trim(str: string): string {
  /* If the value is empty (or falsy), return it unchanged */
  if (!str) {
    return str;
  }
  return str.trim();
}


export function trimLeft(str: string): string {
  /* If the value is empty (or falsy), return it unchanged */
  if (!str) {
    return str;
  }
  return str.trimLeft();
}


export function trimRight(str: string): string {
  /* If the value is empty (or falsy), return it unchanged */
  if (!str) {
    return str;
  }
  return str.trimRight();
}
