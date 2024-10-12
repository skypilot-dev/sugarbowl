import { includeIf } from '~/src/functions/array/includeIf.js';
import type { DateTimeResolution, DateTimeResolutionAbbrev } from '~/src/functions/date/truncateIsoDateTime.js';
import { truncateIsoDateTime } from '~/src/functions/date/truncateIsoDateTime.js';

// TODO: Allow a custom separator between date & time

type ISODateTimeString = string; // TODO: Use template type

export type DateTimeStampTransformer = (isoDateString: ISODateTimeString) => string;

export interface DateTimeStampOptions {
  dateTime?: ISODateTimeString | Date; // the date-time to use instead of `new Date()`
  dateTimeResolution?: DateTimeResolution | DateTimeResolutionAbbrev;
  preset?: DateTimeStampPresetCode;
  separator?: string;
}

export type DateTimeStampPresetCode = 'compact' | 'humanized' | 'iso' | 'slug';

export interface DateTimeStampParams {
  dateTimeResolution: DateTimeResolution | DateTimeResolutionAbbrev;
  separator?: string;
  transform: DateTimeStampTransformer;
}

// Return a string representing the current ISO date and time, optionally reformatted
export function makeDateTimeStamp(
  options: DateTimeStampOptions | DateTimeStampPresetCode = 'slug',
): string {
  const resolvedParams = resolveParams(options);
  const dateTime = typeof options === 'string' || !options.dateTime ? new Date() : options.dateTime;
  const { dateTimeResolution = 'second', separator = '-', transform } = resolvedParams;

  const resolvedDateTime = typeof dateTime === 'string' ? dateTime : dateTime.toISOString();

  // Validate the input
  const isoDateTimePattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}(:[0-9]{2}(:[0-9]{2}(.[0-9]{1,3})?)?)?Z$/;
  if (!isoDateTimePattern.test(resolvedDateTime)) {
    throw new Error(`Invalid ISO date time: '${dateTime}'`);
  }

  return transform(truncateIsoDateTime(dateTimeResolution, resolvedDateTime))
    .split('-')
    .join(separator);
}

const functionDict = {
  compact: (isoDateTime: ISODateTimeString) =>
    isoDateTime
      .replace(/[-:Z.]/g, '')
      .replace('T', '-'),
  humanized: (isoDateTime: ISODateTimeString) => {
    const [date, time = ''] = isoDateTime.replace('Z', '').split('T');
    const [h = '', m = '', seconds = ''] = time.split(':');
    const [s, ms = ''] = seconds.split('.');
    return [
      date,
      ...includeIf(h, `-${h}h`),
      ...includeIf(m, `${m}m`),
      ...includeIf(s, `${s}s`),
      ms,
    ].join('');
  },
  slug: (isoDateTime: ISODateTimeString) =>
    isoDateTime
      .replace(/[Z:]/g, '')
      .replace(/[T]/g, '-'),
};

const presetMap = new Map<DateTimeStampPresetCode, DateTimeStampParams | undefined>([
  ['compact', {
    dateTimeResolution: 'second',
    transform: functionDict.compact,
  }],
  ['humanized', {
    dateTimeResolution: 'second',
    transform: functionDict.humanized,
  }],
  // By default, return an ordinarize ISO date-time string truncated to seconds
  ['iso', {
    dateTimeResolution: 'second',
    transform: (dateTime) => dateTime,
  }],
  ['slug', {
    dateTimeResolution: 'second',
    transform: functionDict.slug,
  }],
]);

function resolveParams(options: DateTimeStampOptions | DateTimeStampPresetCode): DateTimeStampParams {
  const presetCode = typeof options === 'string' ? options : options.preset || 'iso';
  const preset = presetMap.get(presetCode);
  if (!preset) {
    throw new Error(`Unrecognized preset: '${options}'`);
  }

  return typeof options === 'string' ? preset : { ...preset, ...options };
}
