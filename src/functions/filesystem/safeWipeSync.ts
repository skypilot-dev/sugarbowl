import fs from 'node:fs';
import path from 'node:path';

import { defaultSafeWipeBoundaries } from './_constants.js';
import type { SafeWipeOptions, SafeWipeResult } from './safeWipe.js';
import type { PathLike } from './toPath.js';
import { toPath } from './toPath.js';

import { checkIsInBoundary, makeBoundaryErrorMessage } from '~/src/functions/filesystem/checkIsInBoundary.js';

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
    childNames.forEach((childName) => {
      const childPath = path.join(resolvedPath, childName);
      const isDirectory = fs.lstatSync(childPath).isDirectory();
      if (isDirectory) {
        if (recursive) {
          fs.rmdirSync(childPath, { recursive });
        }
      } else {
        fs.unlinkSync(childPath);
      }
    });
  }

  return { fullPath: resolvedPath, status: 'OK' };
}
