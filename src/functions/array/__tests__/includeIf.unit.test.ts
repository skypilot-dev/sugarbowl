import { describe, expect, it } from 'vitest';

import { includeIf } from '../includeIf.js';

describe('includeIf(value)', () => {
  it('should include the value in the array if the value is truthy', () => {
    const array = [
      1,
      ...includeIf(2),
      3,
    ];

    const expected = [1, 2, 3];
    expect(array).toStrictEqual(expected);
  });

  it('should not include the value in the array if the value is falsy', () => {
    const array = [
      1,
      ...includeIf(0),
      2,
    ];

    const expected = [1, 2];
    expect(array).toStrictEqual(expected);
  });

  it('should include the value in the array if the condition is truthy', () => {
    const array = [
      1,
      ...includeIf('truthyValue', 2),
      ...includeIf(1, 3),
      ...includeIf({}, 4),
      ...includeIf(true, 5),
      6,
    ];

    const expected = [1, 2, 3, 4, 5, 6];
    expect(array).toStrictEqual(expected);
  });

  it('should not include the value in the array if the condition is falsy', () => {
    const array = [
      1,
      ...includeIf(null, 0),
      ...includeIf(undefined, 0),
      ...includeIf(0, 0),
      ...includeIf('', 0),
      2,
    ];

    const expected = [1, 2];
    expect(array).toStrictEqual(expected);
  });

  it('should correctly narrow the type of the conditional', () => {
    interface Query {
      conditional: string;
    }

    const conditional = undefined;

    const queries: Query[] = [
      ...includeIf(conditional, { conditional }),
      ...includeIf(false, { conditional }),
    ];

    expect(queries).toHaveLength(0);
  });
});
