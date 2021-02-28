import { includeIf } from '../array';
import { DateTimeResolution, DateTimeResolutionAbbrev, truncateIsoDateTime } from './truncateIsoDateTime';


type PresetCode = 'compact' | 'humanize' | 'slug';

export interface SlugifyIsoDateTimeOptions {
  preset?: PresetCode;
  dateTimeResolution?: DateTimeResolution | DateTimeResolutionAbbrev;
}

type TransformIsoDateTime = (isoDateTime: string) => string;


const presetMap = new Map<PresetCode, TransformIsoDateTime>([
  [
    'compact',
    (isoDateTime: string) => isoDateTime
      .replace(/[-:Z.]/g, '')
      .replace('T', '-'),
  ],
  [
    'humanize',
    (isoDateTime: string) => {
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
  ],
  [
    'slug',
    (isoDateTime: string) => isoDateTime
      .replace(/[Z:]/g, '')
      .replace(/[T]/g, '-'),
  ],
]);

export function slugifyIsoDateTime(isoDateTime: string, options: SlugifyIsoDateTimeOptions = {}): string {
  const { preset = 'slug', dateTimeResolution = 'second' } = options;
  const resolvedDateTime = isoDateTime === 'now'
    ? new Date().toISOString()
    : isoDateTime;

  // Validate the input
  const isoDateTimePattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}(:[0-9]{2}(:[0-9]{2}(.[0-9]{1,3})?)?)?Z$/;
  if (!isoDateTimePattern.test(resolvedDateTime)) {
    throw new Error(`Invalid ISO date time: '${isoDateTime}'`);
  }

  const transform = presetMap.get(preset);
  if (!transform) {
    throw new Error(`Unrecognized preset code: '${preset}'`);
  }
  return transform(truncateIsoDateTime(dateTimeResolution, resolvedDateTime));
}
