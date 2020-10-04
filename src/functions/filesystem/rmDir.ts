import fs from 'fs';
import path from 'path';
import util from 'util';

const readDir = util.promisify(fs.readdir);
const removeDir = util.promisify(fs.rmdir);
const unlink = util.promisify(fs.unlink);

/* Remove the directory and all its contents */
export async function rmDir(dirPath: string): Promise<void> {

  if (!fs.existsSync(dirPath)) {
    return;
  }
  const childNames = await readDir(dirPath);
  await Promise.all(
    childNames.map(childName => {
      const childPath = path.join(dirPath, childName);
      return fs.lstatSync(childPath).isDirectory()
        ? rmDir(childPath) // recursively call `rmDir` on each directory
        : unlink(childPath);
    })
  );
  await removeDir(dirPath); // Use the Node `rmDir` function to remove the directory itself
}
