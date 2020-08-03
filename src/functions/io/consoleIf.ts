/* Given a value, return a function that
   - if the value is truthy, outputs a message to the console
   - otherwise, does nothing
 */
export function consoleIf(verbose: unknown): (message: string) => void {
  /* eslint-disable-next-line no-console */
  return (message: string): void => verbose ? console.log(message) : undefined;
}
