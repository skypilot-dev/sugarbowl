/* Given an object and a key name, convert  */
import { JsonArray, JsonMap } from '@skypilot/common-types';

export function entriesToKeyedItems(keyName: string, obj: Record<string, JsonMap>): JsonArray {
  return Object.entries(obj)
    .map(([key, entry]) => (
      {
        [keyName]: key,
        ...entry,
      }
    ));
}
