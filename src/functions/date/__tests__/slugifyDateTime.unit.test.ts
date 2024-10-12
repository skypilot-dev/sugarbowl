import { describe, expect, it } from 'vitest';

import { slugifyDateTime } from '../slugifyDateTime.js';

const isoDateTime = '1989-01-28T01:02:03.456Z';
const resolutions = [
  'day',
  'hour',
  'minute',
  'second',
  'millisecond',
] as const;

describe('slugifyDateTime', () => {
  it("using the default ('slug') preset, should use _ as the date-time separator and - as the unit separator", () => {
    const expecteds = {
      day: '1989-01-28',
      hour: '1989-01-28-01',
      minute: '1989-01-28-0102',
      second: '1989-01-28-010203',
      millisecond: '1989-01-28-010203.456',
    };

    resolutions.forEach(dateTimeResolution => {
      const simplified = slugifyDateTime(isoDateTime, { dateTimeResolution, preset: 'slug' });
      const expected = expecteds[dateTimeResolution];
      expect(simplified).toBe(expected);
    });
  });

  it("using the 'compact' preset, should strip out nondigits & separate date from time with a hyphen", () => {
    const expecteds = {
      day: '19890128',
      hour: '19890128-01',
      minute: '19890128-0102',
      second: '19890128-010203',
      millisecond: '19890128-010203456',
    };

    resolutions.forEach(dateTimeResolution => {
      const simplified = slugifyDateTime(isoDateTime, { dateTimeResolution, preset: 'compact' });
      const expected = expecteds[dateTimeResolution];
      expect(simplified).toBe(expected);
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
      const simplified = slugifyDateTime(isoDateTime, { dateTimeResolution, preset: 'humanized' });
      const expected = expecteds[dateTimeResolution];
      expect(simplified).toBe(expected);
    });
  });

  it("given the special 'now' date-time string, should use the current time", () => {
    const slugified = slugifyDateTime('now');
    const pattern = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
    expect(pattern.test(slugified)).toBe(true);
  });

});
