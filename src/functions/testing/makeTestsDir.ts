import path from 'path';

import { Directory } from 'src/classes';
import { makeTempDir } from 'src/functions';

// Create a test dir
export function makeTestsDir(dirPath = 'tmp/test'): Directory {
  return new Directory(process.env.CI
    ? makeTempDir('test')
    : makeTempDir(dirPath, { baseDir: path.resolve() })
  );
}
