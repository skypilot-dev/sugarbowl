import { includeIf } from '~/src/functions/array/includeIf.js';
import type { DateTimeResolution, DateTimeResolutionAbbrev } from '~/src/functions/date/truncateIsoDateTime.js';
import { truncateIsoDateTime } from '~/src/functions/date/truncateIsoDateTime.js';

export type SlugifyDateTimeFunction = (isoDateString: string) => string;

export interface SlugifyDateTimeOptions {
  dateTimeResolution?: DateTimeResolution | DateTimeResolutionAbbrev;
  preset: SlugifyDateTimePresetCode;
}

export type SlugifyDateTimePresetCode = 'compact' | 'humanized' | 'slug';

export interface SlugifyDateTimeParams {
  dateTimeResolution: DateTimeResolution | DateTimeResolutionAbbrev;
  transform: SlugifyDateTimeFunction;
}

const functionDict = {
  compact: (isoDateTime: string) =>
    isoDateTime
      .replace(/[-:Z.]/g, '')
      .replace('T', '-'),
  humanized: (isoDateTime: string) => {
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
  slug: (isoDateTime: string) =>
    isoDateTime
      .replace(/[Z:]/g, '')
      .replace(/[T]/g, '-'),
};

const presetMap = new Map<SlugifyDateTimePresetCode, SlugifyDateTimeParams | undefined>([
  ['compact', {
    dateTimeResolution: 'second',
    transform: functionDict.compact,
  }],
  ['humanized', {
    dateTimeResolution: 'second',
    transform: functionDict.humanized,
  }],
  ['slug', {
    dateTimeResolution: 'second',
    transform: functionDict.slug,
  }],
]);

/* @deprecated Use `makeDateTimeStamp` instead */
export function slugifyDateTime(
  isoDateTime: string | Date,
  options: SlugifyDateTimeOptions | SlugifyDateTimePresetCode = 'slug',
): string {
  const resolvedParams = resolveParams(options);
  const { dateTimeResolution, transform } = resolvedParams;

  const resolvedDateTime = isoDateTime === 'now'
    ? new Date().toISOString()
    : typeof isoDateTime === 'string'
    ? isoDateTime
    : isoDateTime.toISOString();

  // Validate the input
  const isoDateTimePattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}(:[0-9]{2}(:[0-9]{2}(.[0-9]{1,3})?)?)?Z$/;
  if (!isoDateTimePattern.test(resolvedDateTime)) {
    throw new Error(`Invalid ISO date time: '${isoDateTime}'`);
  }

  return transform(truncateIsoDateTime(dateTimeResolution, resolvedDateTime));
}

function resolveParams(options: SlugifyDateTimeOptions | SlugifyDateTimePresetCode): SlugifyDateTimeParams {
  const presetCode = typeof options === 'string' ? options : options.preset;
  const preset = presetMap.get(presetCode);
  if (!preset) {
    throw new Error(`Unrecognized preset: '${options}'`);
  }

  return typeof options === 'string' ? preset : { ...preset, ...options };
}
