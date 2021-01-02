import fs from 'fs';
import path from 'path';
import { JsonValue } from '@skypilot/common-types';
import { prettify } from 'src/functions/string/prettify';
import { pushIf } from '../array';
import {
  DateTimeResolution,
  DateTimeResolutionAbbrev,
  truncateIsoDateTime,
} from '../date/truncateIsoDateTime';
import { inflectByNumber } from '../string';
import { wipeDir } from './wipeDir';

export type WriteDataFileOptions = {
  addIsoDateTime?: boolean;
  basePath?: string;
  overwrite?: boolean;
  dryRun?: boolean;
  identifier?: string;
  isoDateTimeResolution?: DateTimeResolution | DateTimeResolutionAbbrev;
  label?: string;
  verbose?: boolean;
  wipeDir?: boolean;
}

export type WriteDataFileResult<T> = {
  data: T;
  fileName: string;
  fullPath: string;
  isoDateTime: string;
  operation: string;
  operationWithPath: string;
  overwritten: boolean;
  relativePath: string;
  shortestPath: string;
}

/* Given a blob of data, write it to a standardized location under a standardized file name. */
export async function writeDataFile<T extends JsonValue>(
  data: T, filePath: string, options: WriteDataFileOptions = {}
): Promise<WriteDataFileResult<T>> {
  if (!filePath) {
    throw new Error('`filePath` cannot be empty');
  }

  if (!data) {
    throw new Error('`data` cannot be empty');
  }

  const {
    addIsoDateTime,
    basePath = '',
    dryRun,
    identifier,
    label,
    overwrite,
    isoDateTimeResolution = 's',
    verbose,
    wipeDir: wipeRequested,
  } = options;

  const unresolvedFilePath = `${basePath}${filePath}`;

  const bareFileName = path.basename(unresolvedFilePath, '.json');
  const baseDirPath = path.dirname(unresolvedFilePath);

  const dirPath = path.resolve(baseDirPath);

  if (!dryRun) {
    if (wipeRequested) {
      await wipeDir(dirPath, { recursive: true });
    }
    await fs.promises.mkdir(dirPath, { recursive: true });
  }

  /* Construct a file name that optionally includes an identifier and/or timestamp. */
  const fileNameElements: string[] = [bareFileName];
  const isoDateTime = new Date().toISOString();
  if (identifier) {
    fileNameElements.push(identifier);
  }
  if (addIsoDateTime) {
    fileNameElements.push(truncateIsoDateTime(isoDateTimeResolution, isoDateTime));
  }

  /* TODO: Support other file formats, including JavaScript and TypeScript. */
  const extension = '.json';

  const finalFileName = `${fileNameElements.join('-')}${extension}`;
  const finalFilePath = path.join(path.resolve(dirPath), finalFileName);
  const relativePath = path.relative(path.resolve(), finalFilePath);
  const shortestPath = relativePath.length < finalFilePath.length ? relativePath : finalFilePath;

  let overwritten = false;
  if (!dryRun) {
    if (fs.existsSync(finalFilePath)) {
      if (overwrite) {
        overwritten = true;
      } else {
        return Promise.reject(new Error(`The file '${shortestPath}' already exists`));
      }
    }
    await fs.promises.writeFile(finalFilePath, prettify(data), { encoding: 'utf-8' });
  }

  const descriptionElements: string[] = [];
  if (Array.isArray(data)) {
    descriptionElements.push(data.length.toString());
    descriptionElements.push(inflectByNumber(data.length, 'record was', 'records were'));
  } else {
    pushIf(descriptionElements, label);
    descriptionElements.push('object was');
  }
  descriptionElements.push('written');
  const operation = descriptionElements.join(' ');
  const operationWithPath = `${operation} to '${shortestPath}'`;
  if (verbose) {
    /* eslint-disable-next-line no-console */
    console.log(operationWithPath);
  }

  return {
    data,
    fileName: finalFileName,
    fullPath: finalFilePath,
    isoDateTime,
    operation,
    operationWithPath,
    overwritten,
    relativePath: path.relative(path.resolve(), finalFilePath),
    shortestPath,
  };
}
