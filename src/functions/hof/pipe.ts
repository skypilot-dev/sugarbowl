/* eslint-disable @typescript-eslint/ban-types */

export function pipe(...functions: Function[]) {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types */
  return (initialValue: any): any => functions.reduce((value, fn) => fn(value), initialValue);
}
