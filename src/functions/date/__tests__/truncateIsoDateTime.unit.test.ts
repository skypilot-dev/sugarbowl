import { truncateIsoDateTime } from '../truncateIsoDateTime';

describe('truncateIsoDateTime(:DateTimeResolution, dateTime?:string)', () => {
  it('by default should return an ISO date-time string for the current time', () => {
    const rounded = truncateIsoDateTime('s');

    expect(rounded.length).toBe(20);
    expect(rounded.slice(-1)).toBe('Z');
  });

  it("when resolution is 'ms' or 'millisecond', should return the original", () => {
    const isoString = '2020-05-30T12:34:56.789Z';
    const resolutions = ['ms', 'millisecond'] as const;

    resolutions.forEach(resolution => {
      const rounded = truncateIsoDateTime(resolution, isoString);

      expect(rounded).toBe(isoString);
    });
  });

  it("when resolution is 's' or 'second', should truncate after seconds", () => {
    const isoString = '2020-05-30T12:34:56.789Z';
    const resolutions = ['s', 'second'] as const;

    resolutions.forEach(resolution => {
      const rounded = truncateIsoDateTime(resolution, isoString);

      const expected = '2020-05-30T12:34:56Z';

      expect(rounded).toBe(expected);
    });
  });

  it("when resolution is 'm' or 'minute', should truncate after minutes", () => {
    const isoString = '2020-05-30T12:34:56.789Z';
    const resolutions = ['m', 'minute'] as const;

    resolutions.forEach(resolution => {
      const rounded = truncateIsoDateTime(resolution, isoString);

      const expected = '2020-05-30T12:34Z';

      expect(rounded).toBe(expected);
    });
  });

  it("when resolution is 'h' or 'hour', should truncate after hour", () => {
    const isoString = '2020-05-30T12:34:56.789Z';
    const resolutions = ['h', 'hour'] as const;

    resolutions.forEach(resolution => {
      const rounded = truncateIsoDateTime(resolution, isoString);

      const expected = '2020-05-30T12Z';

      expect(rounded).toBe(expected);
    });
  });

  it("when resolution is 'd' or 'day', should return the year, month & day", () => {
    const isoString = '2020-05-30T12:34:56.789Z';
    const resolutions = ['d', 'day'] as const;

    resolutions.forEach(resolution => {
      const rounded = truncateIsoDateTime(resolution, isoString);

      const expected = '2020-05-30Z';

      expect(rounded).toBe(expected);
    });
  });

  it("when resolution is 'M' or 'month', should return the year & month", () => {
    const isoString = '2020-05-30T12:34:56.789Z';
    const resolutions = ['M', 'month'] as const;

    resolutions.forEach(resolution => {
      const rounded = truncateIsoDateTime(resolution, isoString);

      const expected = '2020-05Z';

      expect(rounded).toBe(expected);
    });
  });

  it("when resolution is 'y' or 'year', should return the year", () => {
    const isoString = '2020-05-30T12:34:56.789Z';
    const resolutions = ['y', 'year'] as const;

    resolutions.forEach(resolution => {
      const rounded = truncateIsoDateTime(resolution, isoString);

      const expected = '2020Z';

      expect(rounded).toBe(expected);
    });
  });
});
