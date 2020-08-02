/* eslint-disable @typescript-eslint/no-explicit-any */

export function includeIf<T>(valueToIncludeIfTruthy: T): T[];
export function includeIf<T>(conditional: any, value: T): T[];

/* If the condition is truthy, return the value in an array; otherwise, return an empty array; if
   only one argument is received, use it as both the condition and the value
   (convenience function for conditional inclusion in an array) *  */
export function includeIf<T>(conditional: any | T, value = conditional): T[] {
  return conditional ? [value] : [];
}
