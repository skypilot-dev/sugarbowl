import * as actualExports from '../src';

const intendedExports = [
  /* Array functions */
  'flatten',
  'pickRandomItems',
  'shuffle',
  'toUniqueArray',

  /* Array sort functions */
  'sorterOnDigits',

  /* Date functions */
  'isValidDate',

  /* string functions */
  'capitalizeAllWords',
  'capitalizeFirstWord',
  'computeHash',
  'digitsOnly',
  'inflectByNumber',
  'inflectQuantity',
  'isEnclosed',
  'nondigitsOnly',
  'parseEnclosed',
  'removeExtraWhitespace',
  'removeWhitespace',
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

