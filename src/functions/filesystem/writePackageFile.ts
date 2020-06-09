import fs from 'fs';
import { Integer, JsonMap } from '@skypilot/common-types';
import { findUpTree } from './findUpTree';

interface WritePackageFileOptions {
  content: JsonMap;
  pathToFile?: string;
  indentSize?: Integer;
}

export function writePackageFile(options: WritePackageFileOptions): void {
  const {
    content,
    pathToFile = findUpTree('package.json'),
    indentSize = 2,
  } = options;
  const stringifiedData: string = JSON.stringify(content, undefined, indentSize);
  fs.writeFileSync(pathToFile, `${stringifiedData}\n`);
}
