import { Json, JsonValue } from '@skypilot/common-types';

export function prettify(data: JsonValue): Json {
  return JSON.stringify(data, undefined, 2);
}
