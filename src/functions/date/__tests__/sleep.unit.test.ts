import { sleep } from '../sleep';

describe('sleep()', () => {
  it('sleep(1000) should sleep for 1 second', async () => {
    const msToSleep = 1000;
    const startTime = new Date().getTime();

    await sleep(msToSleep);
    const endTime = new Date().getTime();

    const elapsedTime = endTime - startTime;
    expect(elapsedTime).toBeGreaterThanOrEqual(1000);
  });
});
