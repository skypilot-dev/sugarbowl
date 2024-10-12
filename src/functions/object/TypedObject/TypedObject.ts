import { getObjectEntries } from '~/src/functions/object/TypedObject/getObjectEntries.js';
import { getObjectKeys } from '~/src/functions/object/TypedObject/getObjectKeys.js';
import { getObjectValues } from '~/src/functions/object/TypedObject/getObjectValues.js';

export const TypedObject = {
  entries: getObjectEntries,
  keys: getObjectKeys,
  values: getObjectValues,
};
