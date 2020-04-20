export function pipe(...functions: Function[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (initialValue: any) => functions.reduce((value, fn) => fn(value), initialValue);
}
