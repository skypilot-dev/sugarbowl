import { describe, expect, it } from '@jest/globals';

import { roundSignificant } from '../roundSignificant.js';

describe('roundSignificant()', () => {
  it('rounds 251 to 250', () => {
    const original = 251;
    const expectedRounded = 250;

    const actualRounded = roundSignificant(original, 2);

    expect(actualRounded).toBe(expectedRounded);
  });

  it('rounds 0.11 to 0.11', () => {
    const original = 0.111;
    const expectedRounded = 0.11;

    const actualRounded = roundSignificant(original, 2);

    expect(actualRounded).toBe(expectedRounded);
  });

  it('rounds 0 to 0', () => {
    expect(roundSignificant(0)).toBe(0);
  });
});
