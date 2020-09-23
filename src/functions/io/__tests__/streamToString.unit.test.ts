import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { makeTempDir } from 'src/functions/filesystem/makeTempDir';
import { streamToString } from '../streamToString';

describe('streamToString(stream)', () => {
  it('give a stream created by Readable.from(), should return its content as a string', async () => {
    const stream = Readable.from('sample text');

    const content = await streamToString(stream);

    expect(content).toBe('sample text')
  });

  it('give a stream created by fs.ReadStream, should return its content as a string', async () => {
    const tmpDir = makeTempDir('streamToString-unit-test');
    const filePath = path.join(tmpDir, 'stream.txt');
    fs.writeFileSync(filePath, 'sample text', { encoding: 'utf-8' });

    const stream = fs.createReadStream(filePath)
    const content = await streamToString(stream);

    expect(content).toBe('sample text')

    fs.unlinkSync(filePath);
  });
});
