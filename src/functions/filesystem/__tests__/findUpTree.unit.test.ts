import assert from 'node:assert';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { describe, expect, it } from 'vitest';

import { findUpTree } from '../findUpTree.js';

const pathToPackageFile = path.resolve(__dirname, '../../../../package.json');

describe('findUpTree(name:string)', () => {
  it('if the file exists, should return the full path of the file', () => {
    const foundPath = findUpTree('package.json');
    expect(foundPath).toBe(pathToPackageFile);
  });

  it('if a starting directory is specified, should use it instead of the CWD', () => {
    const foundPath = findUpTree('package.json', { startAtDir: __dirname });
    expect(foundPath).toBe(pathToPackageFile);
  });

  it('if the file does not exist, should return an empty string', () => {
    const foundPath = findUpTree('nonexistent-file');
    expect(foundPath).toBe('');
  });

  it('can find a directory', () => {
    const [projectDir] = path.dirname(pathToPackageFile).split('/').slice(-1);
    assert.ok(projectDir, 'projectDir should be a string');
    const foundPath = findUpTree(projectDir);
    expect(foundPath).toBe(path.dirname(pathToPackageFile));
  });
});
