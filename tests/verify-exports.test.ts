import * as actualExports from '../src';

const intendedExports = [
  /* array functions */
  'pickRandomItems',
  'shuffle',
  'sorterOnDigits',
  'toUniqueArray',

  /* date functions */
  'isValidDate',

  /* string functions */
  'capitalizeAllWords',
  'capitalizeFirstWord',
  'digitsOnly',
  'nondigitsOnly',
  'padEnd',
  'padStart',
  'removeExtraWhitespace',
  'removeWhitespace',
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

