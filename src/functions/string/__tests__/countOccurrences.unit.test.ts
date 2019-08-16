import { countOccurrences } from '../countOccurrences';

describe('countOccurrences()', () => {
  it('given a string containing 2 occurrences of the substring, should return 2', () => {
    const str = 'aa';
    const substring = 'a';
    expect(countOccurrences(str, substring)).toEqual(2);
  });

  it('given a string containing 0 occurrences of the substring, should return 0', () => {
    const str = 'aa';
    const substring = 'b';
    expect(countOccurrences(str, substring)).toEqual(0);
  });

  it('given an empty string and a non-empty substring, should return 0', () => {
    const str = '';
    const substring = 'a';
    expect(countOccurrences(str, substring)).toEqual(0);
  });

  it('given an empty substring, should return NaN', () => {
    const str = 'a';
    const substring = '';
    expect(countOccurrences(str, substring)).toEqual(NaN);
  });
});
