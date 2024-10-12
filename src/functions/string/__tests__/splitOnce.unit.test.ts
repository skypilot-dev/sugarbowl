import { describe, expect, it } from 'vitest';

import { splitOnce } from '~/src/functions/string/splitOnce.js';

describe('splitOnce()', () => {
  it('should return a 2-element array, containing text before and after the 1st occurrence of the splitter', () => {
    const stringToSplit = '123|456|789';
    const splitter = '|';
    const expectedSplits = ['123', '456|789'];
    const splits = splitOnce(stringToSplit, splitter);
    expect(splits).toEqual(expectedSplits);
  });

  it('if the splitter is not found in the string, should return the entire string', () => {
    const stringToSplit = '123';
    const splitter = '|';
    const expectedSplits = ['123'];
    const splits = splitOnce(stringToSplit, splitter);
    expect(splits).toEqual(expectedSplits);
  });
});
