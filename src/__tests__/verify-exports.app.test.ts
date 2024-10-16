import { describe, expect, it } from 'vitest';

import * as actualExports from '~/src/index.js';

const intendedExports: string[] = [
  /* Array functions */
  'flatten',
  'getDuplicates',
  'getFirstIntersection',
  'getIntersection',
  'getLastItem',
  'includeIf',
  'includes',
  'omitSequentialDuplicateItems', // TODO: Rename to "exclude" to avoid confusion with object functions
  'pagesToIndices',
  'pickRandomItem',
  'pickRandomItems',
  'pushIf',
  'range',
  'resolveSlice',
  'shuffle',
  'toArray',
  'toUniqueArray',

  // Array-function factories
  'Slice',

  /* Array sort functions */
  'sorterOnDigits',

  /* Date & time functions */
  'isValidDate',
  'makeDateTimeStamp',
  'sleep',
  'slugifyDateTime', // deprecated in favor of `makeDateTimeStamp`
  'toUnixTime',
  'truncateIsoDateTime',

  /* Filesystem functions */
  'checkIsChildPath',
  'checkIsInBoundary',
  'composeFileName',
  'deleteFileSync',
  'findPackageFileDir',
  'findUpTree',
  'getFileSystemRoot',
  'listFilesSync',
  'makeTempDir',
  'readPackageFileSync',
  'safeWipe',
  'safeWipeSync',
  'toPath',
  'writeDataFile',
  'writePackageFileSync',

  /* Higher-order functions */
  'curry',
  'extendFunction',
  'pipe',
  'toMapFunction',

  /* Truthy/falsy/defined functions */
  'isDefinite',
  'isIndefinite',
  'isNull',
  'isTruthy',
  'isUndefined',

  /* Input/output functions */
  'consoleIf',

  /* Number functions */
  'generateRandomInt',
  'isInteger',
  'isNumeric',

  /* Object functions */
  'entriesToKeyedItems',
  'filterLeavesByKey',
  'getOrDefault',
  'isObject',
  'mergeIf',
  'omitByValue',
  'omitEmpty',
  'omitEmptyArrays',
  'omitEmptyObjects',
  'omitEntriesByValue', // deprecated
  'omitFalsy',
  'omitFalsyEntries', // deprecated
  'omitIndefinite',
  'omitNulls',
  'omitUndefined',
  'omitUndefinedEntries', // deprecated
  'setValueByPath',
  'swapKeysAndValues',
  'TypedObject',

  /* String functions */
  'capitalizeAllWords',
  'capitalizeFirstWord',
  'computeHash',
  'countOccurrences',
  'digitsOnly',
  'inflectByNumber',
  'inflectQuantity',
  'isEnclosed',
  'nondigitsOnly',
  'parseEnclosed',
  'parseInteger',
  'randomAlphanumeric',
  'removeExtraWhitespace',
  'removeWhitespace',
  'splitOnce',
  'startsWith',

  /* String prototype wrappers */
  'padEnd',
  'padStart',
  'toLowerCase',
  'toUpperCase',
  'trim',
  'trimLeft',
  'trimRight',

  /* Test helpers */
  'makeTestDir',
  'makeTestsDir',
  'makeTestRunDir',

  /* Classes */
  'Directory',
  'EventLog',
  'StringCounter',
];

describe('Export verification', () => {
  const actualExportNames = Object.keys(actualExports);

  it('exports should include all intended exports', () => {
    for (const exportName of intendedExports) {
      expect(actualExportNames).toContain(exportName);
    }
  });

  it('exports should not include any unintended exports', () => {
    for (const exportName of actualExportNames) {
      expect(intendedExports).toContain(exportName);
    }
  });
});
