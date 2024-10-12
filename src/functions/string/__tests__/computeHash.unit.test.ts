import { describe, expect, it } from 'vitest';

import { computeHash } from '~/src/functions/string/computeHash.js';

describe('computeHash()', () => {
  it('given an empty string, should return the hash for an empty string', () => {
    const hashedString = computeHash('');
    const expectedHash = 'd41d8cd98f00b204e9800998ecf8427e';
    expect(hashedString).toBe(expectedHash);
  });

  it('when length is not specified, should return a 32-character hash', () => {
    const hashedString = computeHash('nonempty');
    const expectedHash = '500b252369809354725f836dbc046317';
    expect(hashedString).toBe(expectedHash);
  });

  it('can compute a hash of requested length up to 32 characters', () => {
    const hashedString = computeHash('stringToHash', 8);
    const expectedHash = '606063e9';
    expect(hashedString).toBe(expectedHash);
  });

  it('if asked for a hash longer than 32, should throw an error', () => {
    const hashedString = computeHash('stringToHash');
    expect(() => {
      computeHash(hashedString, 33);
    }).toThrow();
  });
});
