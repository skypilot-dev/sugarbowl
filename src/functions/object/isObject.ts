/* eslint-disable @typescript-eslint/no-explicit-any */


export function isObject(value: any): boolean {
  return typeof value === 'object'
    ? value !== null
    : typeof value === 'function';
}
