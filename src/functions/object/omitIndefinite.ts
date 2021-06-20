import type { ConditionalExcept } from 'type-fest';
import { isNull } from '../indefinite/isNull';
import { isUndefined } from '../indefinite/isUndefined';

/**
 * @description Return a copy of the object, omitting keys whose values are null or undefined
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function omitIndefinite<O extends { [key: string]: any }>(
  obj: O
): ConditionalExcept<O, null | undefined> {
  return Object.entries(obj).reduce((acc, entry) => {
    const [key, value] = entry;
    if (isUndefined(value) || isNull(value)) {
      return acc;
    }
    return {
      ...acc,
      [key]: value,
    };
  }, {} as ConditionalExcept<O, null | undefined>);
}
