import { describe, expect, it } from 'vitest';

import { toUnixTime } from '../toUnixTime.js';

describe('toUnixTime(:number)', () => {
  it('should convert milliseconds since the Unix Epoch to seconds since the Unix Epoch', () => {
    const jsTimestamp = new Date('2020-01-01T13:00:00Z');
    const unixTimestamp = toUnixTime(jsTimestamp);

    const expected = 1577883600; // known value of Jan 1 2020 13:00
    expect(unixTimestamp).toBe(expected);
  });

  it('given a Date object, should return its equivalent in Unix time', () => {
    const date = new Date('1970-01-01T01:01:01.1Z'); // 1h 1m 1.1s past the Epoch

    const unixTimestamp = toUnixTime(date);

    const expected = 3661; // 1h 1m 1s in seconds
    expect(unixTimestamp).toBe(expected);
  });

  it('given no arguments, should return the current time in seconds since the Unix Epoch', () => {
    const jsNow = new Date().getTime(); // current time in milliseconds
    const unixNow = toUnixTime();

    const toleranceInSeconds = 2;

    const difference = jsNow / 1000 - unixNow;

    expect(Math.abs(difference)).toBeLessThan(toleranceInSeconds);
  });

  it('given a rounding argument, should round to that many decimal places', () => {
    const jsTimestamp = 123455;
    const unixTimestamp = toUnixTime(jsTimestamp, 2);
    const expected = 123.46;
    expect(unixTimestamp).toBe(expected);
  });
});
