import fs from 'node:fs';
import path from 'node:path';
import util from 'node:util';

import { defaultSafeWipeBoundaries } from './_constants.js';

import type { FileSystemBoundary } from '~/src/functions/filesystem/checkIsInBoundary.js';
import { checkIsInBoundary, makeBoundaryErrorMessage } from '~/src/functions/filesystem/checkIsInBoundary.js';
import type { PathLike } from '~/src/functions/filesystem/toPath.js';
import { toPath } from '~/src/functions/filesystem/toPath.js';

export interface SafeWipeOptions {
  boundaries?: FileSystemBoundary[];
  dryRun?: boolean;
  recursive?: boolean;
  remove?: boolean;
}

export interface SafeWipeResult {
  fullPath: string;
  status: 'OK' | 'directory not found' | 'dry run' | 'protected';
}

const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);

/* Remove the contents of the directory without removing the directory itself */
export async function safeWipe(dirPath: PathLike, options: SafeWipeOptions = {}): Promise<SafeWipeResult> {
  const { boundaries = defaultSafeWipeBoundaries, dryRun = false, recursive = false, remove = false } = options;

  const fullPath = path.resolve(toPath(dirPath));
  if (!checkIsInBoundary(fullPath, boundaries)) {
    const operation = remove ? 'remove' : 'wipe';
    throw new Error(makeBoundaryErrorMessage(fullPath, operation, boundaries));
  }

  if (!fs.existsSync(fullPath)) {
    return { fullPath, status: 'directory not found' };
  }

  if (dryRun) {
    return { fullPath, status: 'dry run' };
  }

  if (remove) {
    // Remove the entire directory
    await util.promisify(fs.rmdir)(fullPath, { recursive: true });
  } else {
    const childNames = await readdir(fullPath);
    await Promise.all(
      childNames.map((childName) => {
        const childPath = path.join(fullPath, childName);
        return fs.lstatSync(childPath).isDirectory()
          ? (recursive ? fs.rmdirSync(childPath, { recursive }) : undefined)
          : unlink(childPath);
      }),
    );
  }
  return { fullPath, status: 'OK' };
}
