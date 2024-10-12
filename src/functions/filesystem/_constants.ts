import os from 'node:os';

// Default boundaries within which safe wipes are allowed
import type { FileSystemBoundary } from '~/src/functions/filesystem/checkIsInBoundary.js';

export const defaultSafeWipeBoundaries: FileSystemBoundary[] = [
  { path: 'tmp', scope: 'children' }, // any subdirectory of `PROJECT_ROOT/tmp`
  { path: os.tmpdir(), scope: 'children' }, // any subdirectory of the temporary-files directory
];
