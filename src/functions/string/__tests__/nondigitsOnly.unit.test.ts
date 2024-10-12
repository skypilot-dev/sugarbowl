import { describe, expect, it } from 'vitest';

import { nondigitsOnly } from '~/src/functions/string/nondigitsOnly.js';

describe('nondigitsOnly()', () => {
  it("should return only 'AB' from 'A1B2'", () => {
    const nondigits = nondigitsOnly('A1B2');
    expect(nondigits).toEqual('AB');
  });
});
