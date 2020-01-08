import { readFileSync } from 'fs';

import { JsonObject } from '@skypilot/common-types';


/* Read `package.json` from the project's root dir & return its contents as a JSON object. */
export function readPackageFile(pathToFile = './package.json'): JsonObject {
  const pkgJson = readFileSync(pathToFile, 'utf-8');
  return JSON.parse(pkgJson);
}
