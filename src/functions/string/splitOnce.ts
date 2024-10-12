import { isNonNullable } from '~/src/functions/indefinite/isNonNullable.js';

export function splitOnce(stringToSplit: string, splitter: string): string[] {
  if (!stringToSplit.includes(splitter)) {
    return [stringToSplit];
  }
  const splits = stringToSplit.split(splitter);
  const firstPart = splits[0];
  const secondPart = splits.slice(1).join(splitter);
  return [firstPart, secondPart].filter(isNonNullable);
}
