import * as actualExports from '../src';

const intendedExports = [
  /* array functions */
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

  it('exports should include all intended exports', () => {
    for (const exportName of intendedExports) {
      expect(actualExports).toHaveProperty(exportName);
    }
  });
});
