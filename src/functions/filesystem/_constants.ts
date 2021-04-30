import os from 'os';

// Default boundaries within which safe wipes are allowed
import { FileSystemBoundary } from './checkIsInBoundary';

export const defaultSafeWipeBoundaries: FileSystemBoundary[] = [
  { path: 'tmp', scope: 'children' }, // any subdirectory of `PROJECT_ROOT/tmp`
  { path: os.tmpdir(), scope: 'children' }, // any subdirectory of the temporary-files directory
];
