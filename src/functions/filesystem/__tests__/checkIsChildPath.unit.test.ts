import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { checkIsChildPath } from '~/src/functions/filesystem/checkIsChildPath.js';

describe('checkIsChildPath(targetPath, parentPath)', () => {
  it('should return true if the target path is within the reference path', () => {
    const targetPath = '/parent/child';
    const referencePath = '/parent';
    const expected = true;

    const isChild = checkIsChildPath(targetPath, referencePath);

    expect(isChild).toBe(expected);
  });

  it('should return false if the target path is not within the reference path', () => {
    const targetPath = 'child';
    const referencePath = 'parent/child';
    const expected = false;

    const isChild = checkIsChildPath(targetPath, referencePath);

    expect(isChild).toBe(expected);
  });

  it('should return false if the target path is a sibling of the reference path', () => {
    const targetPath = '/parent-2';
    const referencePath = '/parent';
    const expected = false;

    const isChild = checkIsChildPath(targetPath, referencePath);

    expect(isChild).toBe(expected);
  });

  it('should return false if the target path is the same as the reference path', () => {
    const targetPath = '/parent';
    const referencePath = '/parent';
    const expected = false;

    const isChild = checkIsChildPath(targetPath, referencePath);

    expect(isChild).toBe(expected);
  });

  it('should resolve all paths', () => {
    const targetPath = 'child';
    const referencePath = path.resolve();
    const expected = true;

    const isChild = checkIsChildPath(targetPath, referencePath);

    expect(isChild).toBe(expected);
  });
});
