import { describe, expect, it } from 'vitest';

import { assertIsNonNullable } from '../assertIsNonNullable.js';

describe('assertIsNonNullable()', () => {
  const errorMessage = 'Expected value to be non-nullable';
  it('throws an error if the value is null', () => {
    expect(
      () => assertIsNonNullable(null),
    ).toThrowError(errorMessage);
  });

  it('throws an error if the value is undefined', () => {
    expect(
      () => assertIsNonNullable(undefined),
    ).toThrowError(errorMessage);
  });

  it.each([0, ''])('does not throws an error if the value is otherwise falsy', () => {
    expect(
      () => assertIsNonNullable(undefined),
    ).toThrowError(errorMessage);
  });

  it.each([{}, [], () => {}])('does not throw error if the value is an empty object or function', () => {
    expect(
      () => assertIsNonNullable(undefined),
    ).toThrowError(errorMessage);
  });
});
