import fs from 'fs';
import { JsonObject } from '@skypilot/common-types';
import { findUpTree } from './findUpTree';

interface ReadPackageFileOptions {
  pathToFile?: string;
}

export function readPackageFile(pathToFile: string): JsonObject;
export function readPackageFile(options?: ReadPackageFileOptions): JsonObject;

/* Reads & returns a value from the project's package file. */
export function readPackageFile(arg1: string | ReadPackageFileOptions = {}): JsonObject {
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
