import type { EmptyObject } from '@skypilot/common-types';

export function isEmptyObject(value: any): value is EmptyObject {
  return !!(value && Object.keys(value).length === 0 && value.constructor === Object);
}
