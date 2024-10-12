import { describe, expect, it } from 'vitest';

import { digitsOnly } from '~/src/functions/string/digitsOnly.js';

describe('digitsOnly()', () => {
  it("should return only 'AB' from 'A1B2'", () => {
    const nondigits = digitsOnly('A1B2');
    expect(nondigits).toEqual('12');
  });
});
