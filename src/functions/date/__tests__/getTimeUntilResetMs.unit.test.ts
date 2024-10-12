import { describe, expect, it } from 'vitest';

import { getTimeUntilResetMs } from '../getTimeUntilResetMs.js';

const SECONDS_PER_HOUR = 60 * 60;
const MILLIS_PER_HOUR = SECONDS_PER_HOUR * 1000;

describe('getTimeUntilResetMs()', () => {
  const dataSets: [asAtMs: number, referenceResetEpochMs: number, expectedTimeUntilResetMs: number][] = [
    // From 22:00 to midnight = 2h 00m
    [hmToMs(22, 0), hmToMs(24, 0), hmToMs(2, 0)],
    // From 20:01 to 20:00 = 23h 59m
    [hmToMs(20, 1), hmToMs(20, 0), hmToMs(23, 59)],
  ];
  it.each(dataSets)(
    'when reset is at 24:00 and time is 22:00, reports 2h00m till reset',
    (asAtEpochMs, referenceResetEpochMs, expectedTimeUntilResetMs) => {
      const actualTimeUntilResetMs = getTimeUntilResetMs(referenceResetEpochMs, asAtEpochMs);

      expect(actualTimeUntilResetMs).toBe(expectedTimeUntilResetMs);
    },
  );

  it('works with reference times in the future', () => {
    const asAtEpochMs = Date.now();
    const sinceMidnightMs = asAtEpochMs + MILLIS_PER_HOUR; // one hour in the future;
    const exectedTimeUntilResetMs = MILLIS_PER_HOUR;

    const actualTimeUntilResetMs = getTimeUntilResetMs(sinceMidnightMs, asAtEpochMs);

    expect(actualTimeUntilResetMs).toBe(exectedTimeUntilResetMs);
  });
});

// region | Helper functions
function hmToMs(hours: number, minutes: number): number {
  return (hours * 60 + minutes) * 60 * 1000;
}
// endregion | Helper functions
