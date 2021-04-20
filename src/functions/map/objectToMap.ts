/* eslint-disable @typescript-eslint/ban-types */

/*
  Convert an object to a Map
 */

import { TypedObject } from '../object/TypedObject';

type ObjectValues<O> = O extends ReadonlyArray<infer Values> ? Values
  : O extends Array<infer Values> ? Values
    : O extends null ? never
      : O extends Record<string, infer Values> ? Values
        : never;

export function objectToMap<TRecord extends Object>(
  record: TRecord
): Map<string, ObjectValues<TRecord>> {
  const entries: readonly [string, ObjectValues<TRecord>][] = TypedObject.entries(record)
    .map(([key, value]) => [key as string, value]);
  return new Map<string, ObjectValues<TRecord>>(entries);
}
