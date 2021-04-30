import * as actualExports from '../index';

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
  'shuffle',
  'toArray',
  'toUniqueArray',

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
  'deleteFile',
  'findPackageFileDir',
  'findUpTree',
  'getFileSystemRoot',
  'listFilesSync',
  'makeTempDir',
  'readPackageFile',
  'safeWipe',
  'safeWipeSync',
  'toPath',
  'writeDataFile',
  'writePackageFile',

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
  'omitEmptyArrays',
  'omitEntriesByValue',
  'omitFalsyEntries',
  'omitUndefinedEntries',
  'setValueByPath',
  'swapKeysAndValues',

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
  'StringCounter',
  'ValidationResult',
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
