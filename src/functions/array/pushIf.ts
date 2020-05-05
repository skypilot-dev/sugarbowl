/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function pushIf<T>(array: T[], item: T, condition: any = item): T[] {
  if (condition) {
    array.push(item);
  }
  return array;
}
