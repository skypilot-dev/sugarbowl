import { describe, expect, it } from 'vitest';

import { getOrDefault } from '~/src/functions/object/getOrDefault.js';

describe('getOrDefault(:object, :key, :defaultValue?)', () => {
  it('if the key exists, should return the value', () => {
    const obj = { a: 1, b: 2 };
    const expectedValue = 1;
    const actualValue = getOrDefault(obj, 'a', 2);
    expect(actualValue).toBe(expectedValue);
  });

  it("if the key doesn't exist, should return the default value", () => {
    const obj = {};
    const defaultValue = 1;
    const actualValue = getOrDefault(obj, 'a', defaultValue);
    expect(actualValue).toBe(defaultValue);
  });
});
