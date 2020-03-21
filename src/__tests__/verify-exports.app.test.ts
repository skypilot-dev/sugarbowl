import * as actualExports from '../index';

const intendedExports: string[] = [
  /* Array functions */
  'flatten',
  'omitSequentialDuplicateItems',
  'pickRandomItems',
  'shuffle',
  'toUniqueArray',

  /* Array sort functions */
  'sorterOnDigits',

  /* Date & time functions */
  'isValidDate',
  'sleep',

  /* Filesystem functions */
  'findPackageFileDir',
  'findUpTree',
  'readPackageFile',
  'writePackageFile',

  /* Higher-order functions */
  'curry',
  'extendFunction',
  'toMapFunction',

  /* Number functions */
  'isInteger',

  /* Object functions */
  'entriesToKeyedItems',
  'getOrDefault',
  'isObject',
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

