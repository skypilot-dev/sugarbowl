import { digitsOnly } from '~/src/functions/string/digitsOnly.js';

type FalsyValue = number | null | undefined;

interface ParseIntegerOptions<Empty extends FalsyValue> {
  disallowEmpty?: boolean;
  valueIfEmpty?: Empty;
  minValue?: number;
  maxValue?: number;
}

/* TODO: Support negative values. */

/* Given the string representation of an integer value, return the integer. */
export function parseInteger<Empty extends FalsyValue = undefined>(
  intString: string,
  options: ParseIntegerOptions<Empty> = {},
): number | Empty {
  const { valueIfEmpty = undefined } = options;
  if (valueIfEmpty) {
    throw new Error(`Invalid non-zero value for 'valueIfEmpty': ${valueIfEmpty}`);
  }
  if (intString.trim() === '') {
    if (options.disallowEmpty) {
      throw new Error(`Invalid value: '${intString}'`);
    }
    return valueIfEmpty as Empty;
  }

  if (digitsOnly(intString).length !== intString.length) {
    throw new Error(`Invalid value for integer field: '${intString}'`);
  }

  const intValue = parseInt(intString, 10);

  const { minValue, maxValue } = options;
  if (minValue !== undefined && intValue < minValue) {
    throw new Error(`Value ${intValue} is less than the minimum value of ${maxValue}`);
  }
  if (maxValue !== undefined && intValue > maxValue) {
    throw new Error(`Value ${intValue} is greater than the maximum value of ${maxValue}`);
  }
  return intValue;
}
