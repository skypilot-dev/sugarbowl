import fs from 'fs';
import path from 'path';
import util from 'util';

import { defaultSafeWipeBoundaries } from './_constants';
import { checkIsInBoundary, makeBoundaryErrorMessage } from './checkIsInBoundary';
import type { FileSystemBoundary } from './checkIsInBoundary';
import { toPath } from './toPath';
import type { PathLike } from './toPath';

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
      childNames.map(childName => {
        const childPath = path.join(fullPath, childName);
        return fs.lstatSync(childPath).isDirectory()
          ? (recursive ? fs.rmdirSync(childPath, { recursive }) : undefined)
          : unlink(childPath);
      })
    );
  }
  return { fullPath, status: 'OK' };
}
