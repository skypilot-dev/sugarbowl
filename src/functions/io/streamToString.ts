import { Stream } from 'stream';

export async function streamToString(stream: Stream): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: string[] = [];
    stream.on('data', (chunk) => {
      chunks.push(chunk.toString());
    });
    stream.on('end', () => {
      resolve(chunks.join(''));
    });
    stream.on('error', (error) => reject(error))
  });
}
