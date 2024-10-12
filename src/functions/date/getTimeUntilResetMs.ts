/**
 * Returns the next epoch timestamp for the given reset time.
 */
export function getTimeUntilResetMs(referenceResetEpochMs = 0, asAtEpochMs: number | undefined = undefined): number {
  const nowEpochMs = asAtEpochMs ?? Date.now();

  // If the reference time is in the future, get a reset time at the same of day in the past.
  const referenceEpochResetMsPast = referenceResetEpochMs < nowEpochMs
    ? referenceResetEpochMs
    : (referenceResetEpochMs - Math.ceil((referenceResetEpochMs - nowEpochMs) / (86400 * 1000)) * 86400 * 1000);

  // TODO: Handle reference times that are in the future.
  const sinceLastDailyReset = (nowEpochMs - referenceEpochResetMsPast) % (86400 * 1000);

  return 86400 * 1000 - sinceLastDailyReset;
}

const SECONDS_PER_HOUR = 60 * 60;
const SECONDS_PER_DAY = SECONDS_PER_HOUR * 24;
const MILLIS_PER_DAY = SECONDS_PER_DAY * 1000;

/**
 * Returns the epoch timestamp for the most recent reset.
 */
export function getLastResetEpochMs(referenceResetEpochMs = 0, asAtEpochMs: number | undefined = undefined): number {
  const nowEpochMs = asAtEpochMs || Date.now();

  // If the reference time is in the future, get a reset time at the same time of day in the past.
  if (referenceResetEpochMs > nowEpochMs) {
    return referenceResetEpochMs - Math.ceil((referenceResetEpochMs - nowEpochMs) / (MILLIS_PER_DAY)) * MILLIS_PER_DAY;
  }
  else {
    return referenceResetEpochMs + Math.floor((nowEpochMs - referenceResetEpochMs) / (MILLIS_PER_DAY)) * MILLIS_PER_DAY;
  }
}

/**
 * Returns the next epoch timestamp for the given reset time.
 */
export function getNextResetEpochMs(referenceResetEpochMs = 0, asAtEpochMs: number | undefined = undefined): number {
  return getLastResetEpochMs(referenceResetEpochMs, asAtEpochMs) + MILLIS_PER_DAY;
}

/**
 * Returns the time until the next epoch timestamp for the given reset time.
 */
export function getTimeSinceResetMs(referenceResetEpochMs = 0, asAtEpochMs: number | undefined = undefined): number {
  const nowEpochMs = asAtEpochMs || Date.now();

  return (nowEpochMs - getLastResetEpochMs(referenceResetEpochMs, nowEpochMs)) % (MILLIS_PER_DAY);
}

/**
 * Returns the time until the next epoch timestamp for the given reset time.
 */
// export function getTimeUntilResetMs(referenceResetEpochMs = 0, asAtEpochMs: number | undefined = undefined): number {
//   return MILLIS_PER_DAY - getTimeSinceResetMs(referenceResetEpochMs, asAtEpochMs);
// }
