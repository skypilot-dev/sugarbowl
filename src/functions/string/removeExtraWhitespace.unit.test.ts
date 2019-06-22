import { removeExtraWhitespace } from './removeExtraWhitespace';

describe('removeExtraWhitespace()', () => {
  it('should replace any sequence of tabs and spaces with a single space', () => {
    const dirtyString = 'string\t\t  with tabs\t \t and spaces';
    const cleanString = removeExtraWhitespace(dirtyString);
    expect(cleanString).toBe('string with tabs and spaces');
  });
});
