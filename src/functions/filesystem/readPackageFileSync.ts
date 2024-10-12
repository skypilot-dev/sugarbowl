import fs from 'node:fs';

import type { JsonMap } from '@skypilot/common-types';

import { findUpTree } from '~/src/functions/filesystem/findUpTree.js';

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
    const { filePath = findUpTree('package.json') } = arg1;
    return filePath;
  })();
  const packageFileAsJson = fs.readFileSync(pathToPackageFile, 'utf-8');
  return JSON.parse(packageFileAsJson);
}
