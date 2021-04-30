import fs from 'fs';
import path from 'path';

import { defaultSafeWipeBoundaries } from './_constants';
import { checkIsInBoundary, makeBoundaryErrorMessage } from './checkIsInBoundary';
import { toPath } from './toPath';
import type { PathLike } from './toPath';
import type { SafeWipeOptions, SafeWipeResult } from './safeWipe';

// TODO: Combine with `safeWipe`

/* Remove the contents of the directory without removing the directory itself */
export function safeWipeSync(dirPath: PathLike, options: SafeWipeOptions = {}): SafeWipeResult {
  const { boundaries = defaultSafeWipeBoundaries, dryRun = false, recursive = false, remove = false } = options;

  const resolvedPath = path.resolve(toPath(dirPath));
  if (!checkIsInBoundary(resolvedPath, boundaries)) {
    const operation = remove ? 'remove' : 'wipe';
    throw new Error(makeBoundaryErrorMessage(resolvedPath, operation, boundaries));
  }

  if (!fs.existsSync(resolvedPath)) {
    return { fullPath: resolvedPath, status: 'directory not found' };
  }

  if (dryRun) {
    return { fullPath: resolvedPath, status: 'dry run' };
  }

  if (remove) {
    // Remove the entire directory
    fs.rmdirSync(resolvedPath, { recursive: true });
  } else {
    // Remove the directory's contents but not the directory itself
    const childNames = fs.readdirSync(resolvedPath);
    childNames.forEach(childName => {
      const childPath = path.join(resolvedPath, childName);
      return fs.lstatSync(childPath).isDirectory()
        ? (recursive ? fs.rmdirSync(childPath, { recursive }) : undefined)
        : fs.unlinkSync(childPath);
    });
  }

  return { fullPath: resolvedPath, status: 'OK' };
}
