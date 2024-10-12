import { describe, expect, it } from 'vitest';

import { startsWith } from '../startsWith.js';

describe('startsWith()', () => {
  it('should report that "abc" starts with "a"', () => {
    expect(startsWith('abc', 'a')).toBe(true);
  });

  it('should report that "abc" does not start with "b"', () => {
    expect(startsWith('abc', 'b')).toBe(false);
  });

  it('should report that "" does not start with "a"', () => {
    expect(startsWith('', 'a')).toBe(false);
  });

  it('should report that "abc" starts with ""', () => {
    expect(startsWith('abc', '')).toBe(true);
  });

  it('should report that "abc" starts with "b" at position 1', () => {
    expect(startsWith('abc', 'b', 1)).toBe(true);
  });

  it('should throw an error when position < 0', () => {
    expect(() => {
      startsWith('abc', 'a', -1);
    }).toThrow();
  });
});
