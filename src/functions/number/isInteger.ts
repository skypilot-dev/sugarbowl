import { isObject } from '../object/isObject';


export function isInteger(value: unknown): boolean {
  return !isObject(value) && typeof(value) === 'number' && isFinite(value) && Math.floor(value) === value;
}
