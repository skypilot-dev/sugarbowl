import * as actualExports from '../index';

const intendedExports: string[] = [
  /* Array functions */
  'flatten',
  'getDuplicates',
  'getFirstIntersection',
  'getIntersection',
  'includes',
  'omitSequentialDuplicateItems',
  'pagesToIndices',
  'pickRandomItem',
  'pickRandomItems',
  'pushIf',
  'range',
  'shuffle',
  'toUniqueArray',

  /* Array sort functions */
  'sorterOnDigits',

  /* Date & time functions */
  'isValidDate',
  'sleep',
  'truncateIsoDateTime',

  /* Filesystem functions */
  'findPackageFileDir',
  'findUpTree',
  'readPackageFile',
  'writeDataFile',
  'writePackageFile',

  /* Higher-order functions */
  'curry',
  'extendFunction',
  'pipe',
  'toMapFunction',

  /* Number functions */
  'generateRandomInt',
  'isInteger',

  /* Object functions */
  'entriesToKeyedItems',
  'filterLeavesByKey',
  'getOrDefault',
  'isObject',
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
