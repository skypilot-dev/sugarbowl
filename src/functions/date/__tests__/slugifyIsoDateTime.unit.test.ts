import { slugifyIsoDateTime } from '../slugifyIsoDateTime';

const isoDateTimes = [
  '1989-01-28T01:02:03.456Z',
  '1989-01-28T01:02:03Z',
  '1989-01-28T01:02Z',
];

describe('slugifyIsoDateTime', () => {
  it("using the default ('slug') preset, should use _ as the date-time separator and - as the unit separator", () => {
    const expecteds = [
      '1989-01-28-010203.456', // unlikely to be used
      '1989-01-28-010203',
      '1989-01-28-0102',
    ];

    isoDateTimes.forEach((isoDateTime, index) => {
      const simplified = slugifyIsoDateTime(isoDateTime, 'slug');
      const expected = expecteds[index];
      expect(simplified).toBe(expected);
    });
  });

  it("using the 'humanize' preset, should use - as the date-time separator and h m s as unit indicators", () => {
    const expecteds = [
      '1989-01-28-01h02m03s456',
      '1989-01-28-01h02m03s',
      '1989-01-28-01h02m',
    ];

    isoDateTimes.forEach((isoDateTime, index) => {
      const simplified = slugifyIsoDateTime(isoDateTime, 'humanize');
      const expected = expecteds[index];
      expect(simplified).toBe(expected);
    });
  });

  it("using the 'compact' preset, should strip out nondigits & separate date from time with a hyphen", () => {
    const expecteds = [
      '19890128-010203456',
      '19890128-010203',
      '19890128-0102',
    ];

    isoDateTimes.forEach((isoDateTime, index) => {
      const simplified = slugifyIsoDateTime(isoDateTime, 'compact');
      const expected = expecteds[index];
      expect(simplified).toBe(expected);
    });
  });

  it("given the special 'now' date-time string, should use the current time", () => {
    const slugified = slugifyIsoDateTime('now');
    const pattern = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
    expect(pattern.test(slugified)).toBe(true);
  });
});
