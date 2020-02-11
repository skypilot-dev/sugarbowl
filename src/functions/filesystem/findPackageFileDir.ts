import * as path from 'path';
import { findUpTree } from './findUpTree';

/* Ascend the directory structure until the packgae file is found, then return its containing
 * directory; if it is not found, return an empty string. */
export function findPackageFileDir(filename = 'package.json'): string {
  const pathToPackageFile = findUpTree(filename);
  if (!pathToPackageFile) {
    return ''
  }
  return path.dirname(pathToPackageFile);
}
