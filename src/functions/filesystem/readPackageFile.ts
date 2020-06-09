import fs from 'fs';
import { JsonMap } from '@skypilot/common-types';
import { findUpTree } from './findUpTree';

interface ReadPackageFileOptions {
  pathToFile?: string;
}

export function readPackageFile(pathToFile: string): JsonMap;
export function readPackageFile(options?: ReadPackageFileOptions): JsonMap;

/* Reads & returns a value from the project's package file. */
export function readPackageFile(arg1: string | ReadPackageFileOptions = {}): JsonMap {
  const pathToPackageFile: string = (() => {
    if (typeof arg1 === 'string') {
      return arg1;
    }
    const { pathToFile = findUpTree('package.json') } = arg1 as ReadPackageFileOptions;
    return pathToFile;
  })();
  const packageFileAsJson = fs.readFileSync(pathToPackageFile, 'utf-8');
  return JSON.parse(packageFileAsJson);
}
