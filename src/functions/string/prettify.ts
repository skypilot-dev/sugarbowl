import { Json } from '@skypilot/common-types';

export function prettify(data: object): Json {
  return JSON.stringify(data, undefined, 2);
}
