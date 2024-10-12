import { describe, expect, it } from 'vitest';

import { omitSequentialDuplicateItems } from '../omitSequentialDuplicateItems.js';

describe('omitSequentialDuplicateItems', () => {
  it('given an empty array, should return the array', () => {
    const array: string[] = [];

    const noDuplicates = omitSequentialDuplicateItems(array);

    expect(noDuplicates).toStrictEqual([]);
    expect(noDuplicates).not.toBe(array);
  });
  it('should omit sequential duplicates but not nonsequential duplicates', () => {
    const array = [0, 1, 1, 2, 1];

    const noDuplicates = omitSequentialDuplicateItems(array);

    const expected = [0, 1, 2, 1];
    expect(noDuplicates).toStrictEqual(expected);
  });

  it('can handle values of different types', () => {
    const array = [0, 'a', 'a', 1, 1];

    const noDuplicates = omitSequentialDuplicateItems(array);

    const expected = [0, 'a', 1];
    expect(noDuplicates).toStrictEqual(expected);
  });

  it('can handle a read-only array', () => {
    const array = [0] as const;

    const noDuplicates = omitSequentialDuplicateItems(array);

    const expected = [0];
    expect(noDuplicates).toStrictEqual(expected);
  });

  it('given an evaluation function, should use that function to compare items', () => {
    interface Item { id: string; user: string }
    const array: Item[] = [
      /* Batch 1 */
      { id: '1', user: 'joe' },
      { id: '2', user: 'joe' }, // should be omitted, because only email determines uniqueness
      { id: '3', user: 'jane' },
      { id: '4', user: 'jane' }, // should be omitted
      { id: '5', user: 'jane' }, // should be omitted
      /* Batch 2 */
      { id: '6', user: 'joe' }, // should not omitted
    ];
    const evaluate = ({ user }: Item): string => user;

    const noDuplicates = omitSequentialDuplicateItems(array, { evaluate });

    const expected: Item[] = [
      /* Batch 1 */
      { id: '1', user: 'joe' }, // first sequential occurrences in this batch
      { id: '3', user: 'jane' },
      /* Batch 2 */
      { id: '6', user: 'joe' }, // first sequential occurrence in this batch
    ];
    expect(noDuplicates).toStrictEqual(expected);
  });
});
