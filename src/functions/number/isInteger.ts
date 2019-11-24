/* eslint-disable @typescript-eslint/no-explicit-any */
import { isObject } from '../object/isObject';


export function isInteger(value: any): boolean {
  return !isObject(value) && isFinite(value) && Math.floor(value) === value;
}
