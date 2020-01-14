/* FIXME: Throw an error if the value of `keyName` conflicts with any existing keys. */

/* -- Imports -- */
import { JsonObject } from '@skypilot/common-types';

import { entriesToKeyedItems } from '../entriesToKeyedItems';


/* -- Typings -- */
type SortComparison = -1 | 0 | 1;
type SortFunction = <T>(a: T, b: T) => SortComparison;

/* -- Constants -- */
const SORT_HIGHER: SortComparison = -1;
const SORT_LOWER: SortComparison = 1;

const sortOnKeyFn = <T extends JsonObject, K extends keyof T>(keyName: K): SortFunction => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore // This typing looks good, but TypeScript complains
  (a, b) => a[keyName] < b[keyName] ? SORT_HIGHER : SORT_LOWER
);


/* -- Tests -- */
describe('entriesToKeyedItems(:object)', () => {
  it("given a name and an object consisting of nested object literals, should return an array of keyed items created from the object's entries", () => {
    const obj = {
      key1: { a: 1, b: 2 },
      key2: { c: 3, d: 4 },
    };
    const keyName = 'newKey';
    /* The key is added to the object as the value mapped to a new key named `keyName` */
    const expectedArray = [
      { newKey: 'key2', c: 3, d: 4 },
      { newKey: 'key1', a: 1, b: 2 },
    ];
    const actualArray = entriesToKeyedItems(keyName, obj);
    const sorter = sortOnKeyFn(keyName);
    expect(actualArray.sort(sorter)).toEqual(expectedArray.sort(sorter));
  });
});
