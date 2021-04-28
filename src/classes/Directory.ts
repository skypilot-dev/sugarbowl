import fs from 'fs';
import path from 'path';
import util from 'util';

import { wipeDir } from 'src/functions';
import type { WipeDirOptions } from 'src/functions';
import { isDefined } from 'src/functions/indefinite/isDefined';

export type DirectoryLike = string | string [] | Directory;

interface DirectoryOptions {
  baseDir?: DirectoryLike;
}

export class Directory {
  private readonly _baseDirPath: string; // path to `baseDir`
  private readonly _dirPath: string; // as originally specified relative to `baseDir`
  private readonly _fullPath: string;

  constructor(dirPath: DirectoryLike, options: DirectoryOptions = {}) {
    const { baseDir } = options;

    const stringDirPath = Directory.toPath(dirPath);
    if (!stringDirPath) {
      throw new Error('The directory cannot be an empty value');
    }

    const basePath = isDefined(baseDir) ? path.resolve(Directory.toPath(baseDir))
      : path.resolve();

    this._baseDirPath = basePath;
    this._dirPath = stringDirPath;
    this._fullPath = path.resolve(basePath, stringDirPath);
  }

  static resolve(dir: DirectoryLike): string {
    return path.resolve(this.toPath(dir));
  }

  static toPath(dir: DirectoryLike): string {
    if (typeof dir === 'string') {
      return dir;
    }
    if (Array.isArray(dir)) {
      return path.join(...dir);
    }
    return dir.fullPath;
  }

  get baseDirPath(): string {
    return this._baseDirPath;
  }

  get baseName(): string {
    return path.basename(this._fullPath);
  }

  get dirPath(): string {
    return path.basename(this._fullPath);
  }

  // The first segment of `dirPath`
  get dirPathRoot(): string {
    const firstSegment = this._dirPath.split(path.sep)[0];
    return path.resolve(this._baseDirPath, firstSegment);
  }

  get fullPath(): string {
    return this._fullPath;
  }

  get shortestPathFromBaseDir(): string {
    const relativePath = path.relative(this._baseDirPath, this._fullPath);
    return this._fullPath.length < relativePath.length ? this._fullPath
      : relativePath;
  }

  get shortestPathToBaseDir(): string {
    const relativePath = path.relative(this._fullPath, this._baseDirPath);
    return this._baseDirPath.length < relativePath.length ? this._baseDirPath
      : relativePath;
  }

  async exists(): Promise<boolean> {
    return util.promisify(fs.exists)(this.fullPath);
  }

  existsSync(): boolean {
    return fs.existsSync(this.fullPath);
  }

  async make(): Promise<Directory> {
    await util.promisify(fs.mkdir)(this.fullPath, { recursive: true });
    return this;
  }

  makeSync(): Directory {
    fs.mkdirSync(this.fullPath, { recursive: true });
    return this;
  }

  async remove(): Promise<void> {
    return util.promisify(fs.rmdir)(this.fullPath, { recursive: true });
  }

  removeSync(): void {
    return fs.rmdirSync(this.dirPathRoot, { recursive: true });
  }

  async wipe(options: WipeDirOptions = {}): Promise<void> {
    return wipeDir(this.fullPath, options);
  }
}
