import { describe, expect, it } from 'vitest';

import { makeDateTimeStamp } from '../makeDateTimeStamp.js';

const dateTime = '1989-01-28T01:02:03.456Z';
const resolutions = [
  'day',
  'hour',
  'minute',
  'second',
  'millisecond',
] as const;

describe('makeDateTimeStamp', () => {
  it("using the default ('iso') preset, should display the resolved ISO string", () => {
    const expecteds = {
      day: '1989-01-28Z',
      hour: '1989-01-28T01Z',
      minute: '1989-01-28T01:02Z',
      second: '1989-01-28T01:02:03Z',
      millisecond: '1989-01-28T01:02:03.456Z',
    };

    resolutions.forEach(dateTimeResolution => {
      const dateTimeStamp = makeDateTimeStamp({ dateTime, dateTimeResolution, preset: 'iso' });
      const expected = expecteds[dateTimeResolution];
      expect(dateTimeStamp).toBe(expected);
    });
  });

  it("using the 'compact' preset, should strip out nondigits & separate date from time with a _", () => {
    const expecteds = {
      day: '19890128',
      hour: '19890128-01',
      minute: '19890128-0102',
      second: '19890128-010203',
      millisecond: '19890128-010203456',
    };

    resolutions.forEach(dateTimeResolution => {
      const dateTimeStamp = makeDateTimeStamp({ dateTime, dateTimeResolution, preset: 'compact' });
      const expected = expecteds[dateTimeResolution];
      expect(dateTimeStamp).toBe(expected);
    });
  });

  it("using the 'humanize' preset, should use - as the date-time separator and h m s as unit indicators", () => {
    const expecteds = {
      day: '1989-01-28',
      hour: '1989-01-28-01h',
      minute: '1989-01-28-01h02m',
      second: '1989-01-28-01h02m03s',
      millisecond: '1989-01-28-01h02m03s456',
    };

    resolutions.forEach(dateTimeResolution => {
      const dateTimeStamp = makeDateTimeStamp({ dateTime, dateTimeResolution, preset: 'humanized' });
      const expected = expecteds[dateTimeResolution];
      expect(dateTimeStamp).toBe(expected);
    });
  });

  it("using the 'slug' preset, should use - as the date-time separator and unit separator", () => {
    const expecteds = {
      day: '1989-01-28',
      hour: '1989-01-28-01',
      minute: '1989-01-28-0102',
      second: '1989-01-28-010203',
      millisecond: '1989-01-28-010203.456',
    };

    resolutions.forEach(dateTimeResolution => {
      const dateTimeStamp = makeDateTimeStamp({ dateTime, dateTimeResolution, preset: 'slug' });
      const expected = expecteds[dateTimeResolution];
      expect(dateTimeStamp).toBe(expected);
    });
  });

  it('should use the custom separator if given', () => {
    const dateTimeStamp = makeDateTimeStamp({ preset: 'humanized', separator: '_' });
    expect(dateTimeStamp).toMatch(/^[0-9]{4}_[0-9]{2}_[0-9]{2}_/);
  });
});
