import fs from 'fs';

import { makeTestRunDir } from 'src/functions';
import { wipeDir } from '../wipeDir';
import { makeDirForSafeWipe } from './helpers/makeDirForSafeWipe';

const testRunDir = makeTestRunDir('wipeDir.unit');

// This test is skipped because it lacks the safety features of the replacement function, `safeWipe`

describe.skip('wipeDir', () => {
  it('should delete all files and directories in the directory but not the directory itself', async () => {
    const { baseDir, baseFilePath, subDir } = makeDirForSafeWipe('basic', testRunDir);

    /* Wipe the directory */
    await wipeDir(baseDir.fullPath, { recursive: true });

    expect(fs.existsSync(baseFilePath)).toBe(false);
    expect(fs.existsSync(subDir.fullPath)).toBe(false);
  });
});
