import fs from 'node:fs';
import path from 'node:path';

import type { DirectoryLike } from 'src/classes/Directory.js';
import { Directory } from 'src/classes/Directory.js';
import type { DateTimeStampOptions, DateTimeStampPresetCode, PathLike } from 'src/functions/index.js';
import { composeFileName, inflectByNumber, makeDateTimeStamp, pushIf } from 'src/functions/index.js';
import type { BeautifyOptions } from 'src/functions/string/beautify.js';
import { beautify } from 'src/functions/string/beautify.js';

// TODO: Harmonize with the `WriteFileResult` interface

export interface WriteDataFileOptions {
  baseDir?: DirectoryLike;
  basePath?: string;
  beautifyOptions?: BeautifyOptions;
  dateTimeFormat?: DateTimeStampOptions | DateTimeStampPresetCode;
  dryRun?: boolean;
  identifier?: string;
  label?: string;
  overwrite?: boolean;
  verbose?: boolean;
}

export interface WriteDataFileResult<T> {
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
  data: T, filePath: PathLike, options: WriteDataFileOptions = {}
): Promise<WriteDataFileResult<T>> {
  if (!filePath) {
    throw new Error('`filePath` cannot be empty');
  }

  if (!data) {
    throw new Error('`data` cannot be empty');
  }

  const {
    baseDir,
    beautifyOptions,
    dateTimeFormat,
    dryRun,
    identifier,
    label,
    overwrite,
    verbose,
  } = options;

  const pathElements = [
    Directory.toPath(baseDir || path.resolve()),
    Directory.toPath(filePath),
  ];

  const initialFullPath = path.resolve(...pathElements);
  const initialFileName = path.basename(initialFullPath);
  const dirPath = path.dirname(initialFullPath);

  if (!dryRun) {
    await fs.promises.mkdir(dirPath, { recursive: true });
  }

  /* Construct a file name that optionally includes an identifier and/or timestamp. */
  const fileNameElements: string[] = [initialFileName];
  const isoDateTime = new Date().toISOString();
  if (identifier) {
    fileNameElements.push(identifier);
  }
  if (dateTimeFormat) {
    const dateTimeOptions: DateTimeStampOptions = typeof dateTimeFormat === 'string'
      ? { dateTime: isoDateTime, preset: dateTimeFormat }
      : { dateTime: isoDateTime, ...dateTimeFormat };
    fileNameElements.push(makeDateTimeStamp(dateTimeOptions));
  }

  /* TODO: Support other file formats, including CSV, JavaScript & TypeScript. */
  const extension = '.json';
  fileNameElements.push(extension);

  const finalFileName = composeFileName(fileNameElements);
  const finalFullPath = path.join(dirPath, finalFileName);
  const relativePath = path.relative(path.resolve(), finalFullPath);
  const shortestPath = relativePath.length < finalFullPath.length ? relativePath : finalFullPath;

  let overwritten = false;
  if (!dryRun) {
    if (fs.existsSync(finalFullPath)) {
      if (overwrite) {
        overwritten = true;
      } else {
        return Promise.reject(new Error(`The file '${shortestPath}' already exists`));
      }
    }
    await fs.promises.writeFile(finalFullPath, beautify(data, beautifyOptions), { encoding: 'utf-8' });
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
    fullPath: finalFullPath,
    isoDateTime,
    operation,
    operationWithPath,
    overwritten,
    relativePath: path.relative(path.resolve(), finalFullPath),
    shortestPath,
  };
}
