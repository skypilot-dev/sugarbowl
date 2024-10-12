import { describe, expect, it } from 'vitest';

import { sleep } from '../sleep.js';

describe('sleep()', () => {
  it('sleep(1000) should sleep for 1 second', async () => {
    const msToSleep = 1000;
    const startTime = new Date().getTime();

    await sleep(msToSleep);
    const endTime = new Date().getTime();

    const elapsedTime = endTime - startTime;
    /* Use a tolerance to avoid test failures when there is a tiny variance in timing. */
    const toleranceInMs = 50;
    expect(elapsedTime).toBeGreaterThanOrEqual(1000 - toleranceInMs);
  });
});
