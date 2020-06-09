/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types */

export function isObject(value: any): boolean {
  return typeof value === 'object'
    ? value !== null
    : typeof value === 'function';
}
