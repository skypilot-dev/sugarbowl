/* Ponyfill for `Object.fromEntries` */

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function objectFromEntries<T = any>(
  entries: Iterable<readonly [string | number | symbol, T]>
): { [k: string]: T } {
  if (Object.fromEntries) {
    return Object.fromEntries(entries);
  }
  /* FIXME: Improve typings if possible; TS complains that symbol cannot be used as an index type */
  return [...entries].reduce((obj, [key, value]) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    obj[key] = value
    return obj;
  }, {} as { [k: string]: T });
}
