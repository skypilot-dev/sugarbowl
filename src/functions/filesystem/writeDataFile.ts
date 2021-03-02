import fs from 'fs';
import path from 'path';
import { beautify } from 'src/functions/string/beautify';
import type { BeautifyOptions } from 'src/functions/string/beautify';
import { pushIf } from '../array';
import { slugifyDateTime } from '../date/slugifyDateTime';
import type { SlugifyDateTimeOptions, SlugifyDateTimePresetCode } from '../date/slugifyDateTime';
import { inflectByNumber } from '../string';
import { wipeDir } from './wipeDir';

export type WriteDataFileOptions = {
  basePath?: string;
  beautifyOptions?: BeautifyOptions;
  dateTimeFormat?: SlugifyDateTimeOptions | SlugifyDateTimePresetCode;
  dryRun?: boolean;
  identifier?: string;
  label?: string;
  overwrite?: boolean;
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
export async function writeDataFile<T>(
  data: T, filePath: string, options: WriteDataFileOptions = {}
): Promise<WriteDataFileResult<T>> {
  if (!filePath) {
    throw new Error('`filePath` cannot be empty');
  }

  if (!data) {
    throw new Error('`data` cannot be empty');
  }

  const {
    basePath = '',
    beautifyOptions,
    dateTimeFormat,
    dryRun,
    identifier,
    label,
    overwrite,
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
  if (dateTimeFormat) {
    fileNameElements.push(slugifyDateTime(new Date(), dateTimeFormat));
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
    await fs.promises.writeFile(finalFilePath, beautify(data, beautifyOptions), { encoding: 'utf-8' });
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
