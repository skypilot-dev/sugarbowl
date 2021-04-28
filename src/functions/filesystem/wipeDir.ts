import fs from 'fs';
import path from 'path';
import util from 'util';
import { rmDir } from './rmDir';

export type WipeDirOptions = {
  recursive?: boolean;
}

const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);

/* Remove the contents of the directory without removing the directory itself */
export async function wipeDir(dirPath: string, options: WipeDirOptions = {}): Promise<void> {
  const { recursive } = options;

  if (!fs.existsSync(dirPath)) {
    return;
  }
  const childNames = await readdir(dirPath);
  await Promise.all(
    childNames.map(childName => {
      const childPath = path.join(dirPath, childName);
      return fs.lstatSync(childPath).isDirectory()
        ? (recursive ? rmDir(childPath) : undefined)
        : unlink(childPath);
    })
  );
}
