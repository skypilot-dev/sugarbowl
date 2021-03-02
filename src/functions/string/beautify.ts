/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import jsonBeautify from 'json-beautify';
import { Integer, Json } from '@skypilot/common-types';

export interface BeautifyOptions {
  maxWidth?: Integer;
  replacer?: string[] | ((key: string, value: any) => any);
  space?: Integer;
}

export function beautify(data: any, options: BeautifyOptions = {}): Json {
  const { maxWidth = 80, replacer, space = 2 } = options;
  // @ts-ignore // ignore the erroneous typing in `json-beautify`
  return jsonBeautify(data, replacer, space, maxWidth);
}
