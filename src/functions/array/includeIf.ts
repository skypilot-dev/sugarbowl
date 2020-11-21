/* eslint-disable @typescript-eslint/no-explicit-any */

type Falsy = undefined | null | '' | 0;
type Truthy<T = any> = Exclude<T, Falsy>;

export function includeIf<T extends Falsy>(valueToIncludeIfTruthy: T): [];
export function includeIf<T extends Truthy>(valueToIncludeIfTruthy: T): T[];
export function includeIf<C extends Falsy, T>(conditional: C, value: T): [];
export function includeIf<C extends Truthy, T>(conditional: C, value: T): T[];

/* If the condition is truthy, return the value in an array; otherwise, return an empty array; if
   only one argument is received, use it as both the condition and the value
   (convenience function for conditional inclusion in an array) *  */
export function includeIf<T>(conditional: any | T, value = conditional): T[] {
  return conditional ? [value] : [];
}
