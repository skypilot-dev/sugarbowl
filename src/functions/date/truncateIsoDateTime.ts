import { includes } from '~/src/functions/array/includes.js';

const resolutionAbbrevs = ['ms', 's', 'm', 'h', 'd', 'M', 'y'] as const;
const _resolutions = ['millisecond', 'second', 'minute', 'hour', 'month', 'day', 'month', 'year'] as const;

export type DateTimeResolution = typeof _resolutions[number];
export type DateTimeResolutionAbbrev = typeof resolutionAbbrevs[number];

const abbrevMap = new Map<DateTimeResolutionAbbrev, DateTimeResolution>([
  ['ms', 'millisecond'],
  ['s', 'second'],
  ['m', 'minute'],
  ['h', 'hour'],
  ['d', 'day'],
  ['M', 'month'],
  ['y', 'year'],
]);

const lengthMap = new Map<DateTimeResolution, number>([
  ['millisecond', 23],
  ['second', 19],
  ['minute', 16],
  ['hour', 13],
  ['day', 10],
  ['month', 7],
  ['year', 4],
]);

export function truncateIsoDateTime(
  resolution: DateTimeResolution | DateTimeResolutionAbbrev,
  isoDateTime: string = new Date().toISOString(),
): string {
  const resolutionKey = includes(resolutionAbbrevs, resolution)
    ? abbrevMap.get(resolution) as DateTimeResolution
    : resolution;
  const howManyChars = lengthMap.get(resolutionKey);
  return `${isoDateTime.slice(0, howManyChars)}Z`;
}
