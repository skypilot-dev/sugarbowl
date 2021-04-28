import fs from 'fs';
import path from 'path';
import util from 'util';

import { makeTestRunDir, makeTestsDir } from 'src/functions';
import { Directory } from '../Directory';

const testRunDir = makeTestRunDir(makeTestsDir(), 'Directory.unit');

afterAll(() => {
  testRunDir.removeSync();
});

describe('Directory class', () => {
  describe('instantiation', () => {
    it('should correctly set dirPath, fullPath & baseDirPath upon instantiation', async () => {
      const testDir = new Directory('instantiation', { baseDir: testRunDir });
      expect(testDir.baseName).toBe('instantiation');
      expect(testDir.baseDirPath).toBe(testRunDir.fullPath);
      expect(testDir.dirPath).toBe('instantiation');
      expect(testDir.fullPath).toBe(path.resolve(testRunDir.fullPath, 'instantiation'));
    });

    it('given an empty dirPath, should throw', async () => {
      expect(() => {
        new Directory('', { baseDir: testRunDir });
      }).toThrow();
    });

    it("given '.' as the directory, should resolve to the baseDir", async () => {
      {
        const dir = new Directory('.', { baseDir: testRunDir });
        expect(dir.fullPath).toBe(path.resolve(testRunDir.fullPath));
      }
      {
        const dir = new Directory('.');
        expect(dir.fullPath).toBe(path.resolve());
      }
    });

    it("given '..' as the directory, should resolve to the parent of the baseDir", async () => {
      const dir = new Directory('..', { baseDir: testRunDir });
      const expectedPath = path.resolve(testRunDir.fullPath)
        .split(path.sep)
        .slice(0, -1)
        .join(path.sep);
      expect(dir.fullPath).toBe(expectedPath);
    });

    it("given '..' as the directory relative to the root directory, should return the root directory", async () => {
      // This mirrors the behaviour of `path.resolve()`
      const dir = new Directory('..', { baseDir: '/' });
      const expectedPath = path.resolve('/', '..');
      expect(dir.fullPath).toBe(expectedPath);
    });
  });

  describe('make()', () => {
    it('should create the directory asynchronously', async () => {
      const dir = await new Directory('make', { baseDir: testRunDir }).make();
      await expect(util.promisify(fs.exists)(dir.fullPath)).resolves.toBe(true);
      await expect(dir.exists()).resolves.toBe(true);
    });
  });

  describe('makeSync()', () => {
    it('should create the directory synchronously', async () => {
      const dir = new Directory('make-sync', { baseDir: testRunDir }).makeSync();
      expect(fs.existsSync(dir.fullPath)).toBe(true);
      expect(dir.existsSync()).toBe(true);
    });
  });

  describe('remove()', () => {
    it('should remove the directory asynchronously', async () => {
      const dir = await new Directory('remove', { baseDir: testRunDir }).make();
      await expect(
        util.promisify(fs.exists)(dir.fullPath)
      ).resolves.toBe(true);
      await expect(
        dir.exists()
      ).resolves.toBe(true);
    });
  });

  describe('wipe(:WipeDirOptions)', () => {
    it('should delete all files, but not directories, in the directory, unless `recursive: true`', async () => {
      // Create a directory & subdirectory
      const dir = await new Directory('wipe', { baseDir: testRunDir }).make();
      const subDir = await new Directory('subdir', { baseDir: dir }).make();

      // Create files in the directory & subdirectory
      const dirFilePaths = [path.join(dir.fullPath, 'file1.txt')];
      const subDirFilePaths = [path.join(subDir.fullPath, 'file2.txt'), path.join(subDir.fullPath, 'file3.txt')];
      const filePaths = [dirFilePaths, subDirFilePaths].flat();

      expect.assertions(11);

      filePaths.forEach(filePath => {
        fs.writeFileSync(filePath, 'sample content');
        expect(fs.existsSync(filePath)).toBe(true);
      });


      // Wipe the directory
      await dir.wipe();

      // Confirm that the files in the directory no longer exists, but the files in the subdirectory do
      dirFilePaths.forEach(filePath => {
        expect(fs.existsSync(filePath)).toBe(false);
      });
      subDirFilePaths.forEach(filePath => {
        expect(fs.existsSync(filePath)).toBe(true);
      });

      // Wipe the directory recursively
      await dir.wipe({ recursive: true });

      // Confirm that neither the subdirectory nor the files exist
      expect(fs.existsSync(subDir.fullPath)).toBe(false);
      expect(subDir.existsSync()).toBe(false);
      filePaths.forEach(filePath => {
        expect(fs.existsSync(filePath)).toBe(false);
      });
    });
  });

  describe('baseDirPath', () => {
    it('should return the path to `baseDir`', () => {
      {
        const dir = new Directory('dirName');
        expect(dir.baseDirPath).toBe(path.resolve());
      }
      {
        const dir = new Directory('dirName', { baseDir: testRunDir });
        expect(dir.baseDirPath).toBe(testRunDir.fullPath);
      }
    });
  });

  describe('dirPathRoot', () => {
    it('should return the full path to the first segment in the path', () => {
      const relPath = ['dirPathRoot', 'pathChild'];
      const dir = new Directory(relPath);

      expect(dir.dirPathRoot).toBe(path.resolve('dirPathRoot'));
    });

    it('given a baseDir, should include it in the full path to the first segment', () => {
      const relPath = ['dirPathRoot', 'pathChild'];
      const dir = new Directory(relPath, { baseDir: testRunDir });

      expect(dir.dirPathRoot).toBe(path.resolve(testRunDir.fullPath, 'dirPathRoot'));
    });

    it("given an initial path of '.', should return the baseDir", () => {
      const dir = new Directory('.', { baseDir: testRunDir });
      expect(dir.dirPathRoot).toBe(testRunDir.fullPath);
    });
  });

  describe('shortestPathFromBaseDir', () => {
    it('should return the shortest path from `baseDir` to `dirPath`', () => {
      {
        const dir = new Directory('/dir1/subdir', { baseDir: '../../dir2/subdir' });
        const expectedPath = '/dir1/subdir';
        expect(dir.shortestPathFromBaseDir).toBe(expectedPath);
      }
      {
        const dir = new Directory('/dir/subdir2', { baseDir: '/dir/subdir1' });
        const expectedPath = '../subdir2';
        expect(dir.shortestPathFromBaseDir).toBe(expectedPath);
      }
    });
  });

  describe('shortestPathToBaseDir', () => {
    it('should return the shortest path from `baseDir` to `dirPath`', () => {
      {
        const dir = new Directory('subdir/subsubdir', { baseDir: 'subdir' });
        const expectedPath = '../..';
        expect(dir.shortestPathToBaseDir).toBe(expectedPath);
      }
      {
        const dir = new Directory('/dir/subdir2', { baseDir: '/dir/subdir1' });
        const expectedPath = '../subdir1';
        expect(dir.shortestPathToBaseDir).toBe(expectedPath);
      }
      {
        const dir = new Directory('subdir/subsubdir', { baseDir: '/dir' });
        const expectedPath = '/dir';
        expect(dir.shortestPathToBaseDir).toBe(expectedPath);
      }
    });
  });
});
