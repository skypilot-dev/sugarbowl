import { isEnclosed } from '../isEnclosed';

describe('isEnclosed()', () => {
  it("asked whether '|string|' is enlosed by '|', should return true", () => {
    const str = '|enclosed by same delimiter|';
    expect(isEnclosed(str, '|')).toBe(true);
  });

  it("asked whether '[string]' is enclosed by '[' and ']', should return true", () => {
    const str = '[enclosed by unique delimiters]';
    expect(isEnclosed(str, '[', ']')).toBe(true);
  });

  it("asked whether '|string' is enclosed by '|', should return true", () => {
    const str = '|not enclosed';
    expect(isEnclosed(str, '|')).toBe(false);
  });

  it('asked whether an empty string is enclosed, should return false', () => {
    const str = '';
    expect(isEnclosed(str, '|')).toBe(false);
  });

  it("asked whether 'string' is enclosed by empty strings, should throw an error", () => {
    const str = 'string';
    expect(() => {
      isEnclosed(str, '');
    }).toThrow();
  });
});
