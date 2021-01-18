import type { Integer } from '@skypilot/common-types';

interface CompareStringsOptions {
  locale?: string;
  sensitivity?: 'base' | 'accent';
}

export function compareStrings(a: string, b: string, options: CompareStringsOptions = {}): Integer {
  const { locale, sensitivity = 'base' } = options;
  return a.localeCompare(b, locale, { sensitivity });
}
