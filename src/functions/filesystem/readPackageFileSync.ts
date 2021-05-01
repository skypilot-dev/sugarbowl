import fs from 'fs';
import { JsonMap } from '@skypilot/common-types';
import { findUpTree } from './findUpTree';

interface ReadPackageFileOptions {
  filePath?: string;
}

export function readPackageFileSync(pathToFile: string): JsonMap;
export function readPackageFileSync(options?: ReadPackageFileOptions): JsonMap;

/* Reads & returns a value from the project's package file. */
export function readPackageFileSync(arg1: string | ReadPackageFileOptions = {}): JsonMap {
  const pathToPackageFile: string = (() => {
    if (typeof arg1 === 'string') {
      return arg1;
    }
    const { filePath = findUpTree('package.json') } = arg1 as ReadPackageFileOptions;
    return filePath;
  })();
  const packageFileAsJson = fs.readFileSync(pathToPackageFile, 'utf-8');
  return JSON.parse(packageFileAsJson);
}
