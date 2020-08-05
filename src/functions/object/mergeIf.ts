/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import type { AnyRecord, EmptyObject } from '@skypilot/common-types';

/* If the condition is truthy, return the object; otherwise, return an empty object */
export function mergeIf<O extends AnyRecord>(conditional: any, objectToMerge: O): O | EmptyObject {
  return conditional ? objectToMerge as O : {};
}
