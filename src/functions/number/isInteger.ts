import { isObject } from '~/src/functions/object/isObject.js';

export function isInteger(value: unknown): boolean {
  return !isObject(value) && typeof(value) === 'number' && isFinite(value) && Math.floor(value) === value;
}
