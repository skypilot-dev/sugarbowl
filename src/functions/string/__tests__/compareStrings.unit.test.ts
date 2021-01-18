import { compareStrings } from '../compareStrings';

describe('compareStrings(a:string, b:string, options)', () => {
  it('should return true when the strings are exactly the same', () => {
    const a = '1';
    const b = '1';

    const comparisonResult = compareStrings(a, b);

    expect(comparisonResult).toBe(0);
  });

  it('when sensitivity: "accent", should ignore case but not accent', () => {
    const bases = 'àéóṻṧ';
    const sameAccents = 'ÀÉÓṺṦ';

    const differentAccents = 'aeious';

    differentAccents.split('').forEach((letter, index) => {
      const baseLetter = bases[index];
      expect(compareStrings(letter, baseLetter, { sensitivity: 'accent' })).not.toBe(0);
    });
    expect(compareStrings(bases, sameAccents)).toBe(0);
  });

  it('when `sensitivity: "base"`, should ignore accent & case', () => {
    const bases = 'àéióṻṧ';
    const sameBases = 'AEIOUS';

    expect(compareStrings(bases, sameBases)).toBe(0);
  });

  it("should return false when the strings don't share a common base", () => {
    const a = 'a';
    const b = 'b';

    const comparisonResult = compareStrings(a, b);

    expect(comparisonResult).not.toBe(0);
  });
});
