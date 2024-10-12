import { describe, expect, it } from 'vitest';

import { parseEnclosed } from '~/src/functions/string/parseEnclosed.js';

describe('parseEnclosed()', () => {
  it('given start and end delimiters, should return the text between them', () => {
    const enclosedText = '<a>';
    const expectedInner = 'a';
    expect(parseEnclosed(enclosedText, '<', '>')).toEqual(expectedInner);
  });

  it('given a single delimiter, should use it as start and end delimiters', () => {
    const enclosedText = '|a|';
    const expectedInner = 'a';
    expect(parseEnclosed(enclosedText, '|')).toEqual(expectedInner);
  });

  it('given a delimiter that is not found, should throw an error', () => {
    const enclosedText = '|a';
    expect(() => {
      parseEnclosed(enclosedText, '|');
    }).toThrow();
  });

  it('given an unenclosed string, should throw an error', () => {
    const unenclosedText = 'a';
    expect(() => {
      parseEnclosed(unenclosedText, '|');
    }).toThrow();
  });
});
