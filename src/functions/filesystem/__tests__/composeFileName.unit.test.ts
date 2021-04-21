import { composeFileName } from '../composeFileName';

describe('composeFileName()', () => {
  it('should concatenate the elements with the separator and return the result', () => {
    const fileName = composeFileName(['prefix', 'base', 'suffix']);
    expect(fileName).toBe('prefix_base_suffix');
  });

  it('should not prepend the separator to any element that starts with a period', () => {
    const fileName = composeFileName(['prefix', 'base', '.txt']);
    expect(fileName).toBe('prefix_base.txt');
  });

  it('should ignore empty elements', () => {
    const fileName = composeFileName(['', 'base', '', '.txt']);
    expect(fileName).toMatch(/^base.txt$/);
  });

  it('if given a function as an argument, should evaluate it and include the result', () => {
    function makeTimeStamp(): string {
      return new Date().toISOString().slice(0, 10);
    }
    const fileName = composeFileName(['base', makeTimeStamp, 'suffix', '.txt']);
    expect(fileName).toMatch(/^base_[0-9]{4}-[0-9]{2}-[0-9]{2}_suffix.txt$/);
  });

  it('if the function evaluates to an empty string, null, or undefined, should omit it', () => {
    function returnNothing(): string {
      return '';
    }
    const fileName = composeFileName(['base', returnNothing, 'suffix', '.txt']);
    expect(fileName).toMatch(/^base_suffix.txt$/);
  });

  it('should accept a custom separator', () => {
    const fileName = composeFileName(['prefix', 'base', 'suffix', '.txt'], { separator: '.' });
    expect(fileName).toBe('prefix.base.suffix.txt');
  });
});
