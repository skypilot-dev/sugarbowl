import { Json, JsonValue } from '@skypilot/common-types';

/**
 * @deprecated Use `beautify` instead
 */
export function prettify(data: JsonValue): Json {
  return JSON.stringify(data, undefined, 2);
}
