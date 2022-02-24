import { compareBase } from '../compareBase';

describe('compareBase(localeCode?: string)', () => {
  it('when used in a sort, should sort alphabetically, disregarding case', () => {
    const values = [
      'ac',
      'aa',
      'AB',
    ];
    const expected = [
      'aa',
      'AB',
      'ac',
    ];

    const actual = values.sort(compareBase());
    expect(actual).toStrictEqual(expected);
  });

  it('when localeCode is "en", should disregard diacritics', () => {
    const values = [
      'âD',
      'ãB',
      'Ãc',
      'äa',
    ];
    const expected = [
      'äa',
      'ãB',
      'Ãc',
      'âD',
    ];

    const actual = values.sort(compareBase());
    expect(actual).toStrictEqual(expected);
  });
});
