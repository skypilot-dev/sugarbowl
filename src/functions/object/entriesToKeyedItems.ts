/* Given an object and a key name, convert  */
import { JsonArray, JsonObject } from '@skypilot/common-types';

export function entriesToKeyedItems(keyName: string, obj: { [key: string]: JsonObject }): JsonArray {
  return Object.entries(obj)
    .map(([key, entry]) => (
      {
        [keyName]: key,
        ...entry,
      }
    ));
}
