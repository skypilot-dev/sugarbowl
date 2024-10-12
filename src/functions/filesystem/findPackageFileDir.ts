import * as path from 'node:path';

import { findUpTree } from '~/src/functions/filesystem/findUpTree.js';

/* Ascend the directory structure until the packgae file is found, then return its containing
 * directory; if it is not found, return an empty string. */
export function findPackageFileDir(filename = 'package.json'): string {
  const pathToPackageFile = findUpTree(filename);
  if (!pathToPackageFile) {
    return '';
  }
  return path.dirname(pathToPackageFile);
}
