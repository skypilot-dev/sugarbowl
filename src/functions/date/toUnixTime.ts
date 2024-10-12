import type { Integer } from '@skypilot/common-types';

export type UnixTimestamp = number;
export type JsTimestamp = number;

/* Given a JavaScript timestamp (in milliseconds) or Date, return its Unix equivalent (in seconds);
   if called with no arguments, return the current Unix timestamp */
export function toUnixTime(
  jsTime: JsTimestamp | Date = new Date().getTime(),
  howManyDecimalPlaces: Integer = 0,
): UnixTimestamp {
  if (jsTime instanceof Date) {
    return toUnixTime(jsTime.getTime());
  }
  const unixTimestamp = jsTime / 1000;
  return Math.round(unixTimestamp * 10 ** howManyDecimalPlaces) / 10 ** howManyDecimalPlaces;
}
