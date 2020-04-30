import { Integer } from '@skypilot/common-types';
import { digitsOnly } from './digitsOnly';

type ParseIntegerOptions = {
  disallowEmpty?: boolean;
  emptyEquals0?: boolean;
  minValue?: Integer;
  maxValue?: Integer;
}

/* TODO: Support negative values. */

/* Given the string representation of an integer value, return the integer. */
export function parseInteger(intString: string, options: ParseIntegerOptions = {}): Integer | null {
  if (!intString) {
    if (options.disallowEmpty) {
      throw new Error("Invalid value: ''");
    }
    return options.emptyEquals0 ? 0 : null;
  }

  if (!(digitsOnly(intString).length == intString.length)) {
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
